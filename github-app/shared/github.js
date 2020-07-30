const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const { createAppAuth } = require("@octokit/auth-app");
const { Base64 } = require("js-base64")

const githubAppId = process.env['GITHUB_APP_ID'];
const githubClientId = process.env['GITHUB_CLIENT_ID'];
const githubClientSecret = process.env['GITHUB_CLIENT_SECRET'];
const pem = fs.readFileSync(path.resolve(__dirname, './private-key.pem'));
const auth = createAppAuth({
    id: githubAppId,
    privateKey: pem,
    clientId: githubClientId,
    clientSecret: githubClientSecret,
});

module.exports = {
    createApp: function () {

        let token = null;
        async function getInstallationToken(installationId) {
            if(!token) {
                const response = await auth({
                    type: "installation",
                    installationId: installationId,
                });
                token = response.token;
            }
            return token;
        }

        async function getRequest(installationId, url, data, method) {
            const authToken = await getInstallationToken(installationId);
            const rp = require('request-promise');
            const options = {
                method: method,
                uri: url,
                body: data,
                json: true,
                headers: {
                    "Authorization": `token ${authToken}`,
                    "User-Agent": "Github Experts"
                }
            };
            const response = await rp(options);
            return response;
        }

        async function getFile(owner, repo, installationId, path, branch) {
            const url = `https://api.github.com/repos/repos/${owner}/${repo}/contents/${path}?ref=refs/heads/${branch}`;
            const contents = await getRequest(installationId, url, null, "GET");
            return contents;
        }

        async function gitConfigExists(owner, repo, installationId, path, branch) {
            try {
                const config = await getFile(owner, repo, installationId, path, branch);
                if (config) {
                    return true;
                } else {
                    return false;
                }

            } catch (error) {
                if (error && error.message && error.message === "Not Found") {
                    return false;
                } else {
                    Promise.reject(error);
                }
            }
        }

        async function createBranch(owner, repo, installationId, configBranchName, mainBranchName) {
            const branches = await listRemoteBranches(owner, repo, installationId);
            const mainBranch = branches.filter(i => i.name == mainBranchName);
            const existingConfigBranch = branches.filter(i => i.name == configBranchName);
            if (mainBranch.length > 0 && existingConfigBranch.length == 0) {
                const sha = mainBranch[0].commit.sha;
                newBranch = await createRemoteBranch(owner, repo, installationId, configBranchName, sha);
                return newBranch;
            } else if (existingConfigBranch.length > 0) {
                return existingConfigBranch[0];
            } else {
                return undefined;
            }
        }

        async function listRemoteBranches(owner, repo, installationId) {
            const url = `https://api.github.com/repos/${owner}/${repo}/branches`;
            const branch = await getRequest(installationId, url, null, "GET");
            return branch;
        }

        async function createRemoteBranch(owner, repo, installationId, ref, sha) {
            const dataString = {
                "ref": `refs/heads/${ref}`, 
                "sha": `${sha}`
            };
            const url = `https://api.github.com/repos/${owner}/${repo}/git/refs`;
            const branch = await getRequest(installationId, url, dataString, "POST");
            return branch;
        }

        async function createCommit(owner, repo, installationId, branch, sha, path, message, content) {
            const encodedContent = Base64.encode(content);
            const dataString = {
                branch: branch,
                sha: sha,
                message: message,
                content: encodedContent,
                committer: {
                    name: "Github Experts Bot",
                    email: "githubexperts@microsoft.com",
                },
                author: {
                    name: "Github Experts Bot",
                    email: "githubexperts@microsoft.com",
                }
            };
            const url = `https://api.github.com/repos/${owner}/${repo}/contents${path}`;
            const commit = await getRequest(installationId, url, dataString, "PUT");
            return commit;
        }

        async function createPullRequest(owner, repo, installationId, title, head, base, body) {
            const dataString = {
                title: title,
                head: head,
                base: base,
                body: body
            };
            const url = `https://api.github.com/repos/${owner}/${repo}/pulls`;
            const pr = await getRequest(installationId, url, dataString, "POST");
            return pr;
        }

        function generateJwt(id, cert) {
            const payload = {
                iat: Math.floor(new Date() / 1000),       // Issued at time
                exp: Math.floor(new Date() / 1000) + 60,  // JWT expiration time
                iss: id                                   // Integration's GitHub id
            };
            return jwt.sign(payload, cert, { algorithm: 'RS256' });
        }
        return { getFile, gitConfigExists, createBranch, createCommit, createPullRequest };
    }
};