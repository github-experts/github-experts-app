const request = require('request-promise');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const { createAppAuth } = require("@octokit/auth-app");
const { Octokit } = require("@octokit/rest");
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
    getIdentityRequestUrl: function (state, redirect_url) {
        return 'https://github.com/login/oauth/authorize' +
            `?client_id=${client_id}&redirect_url=${redirect_url}` +
            `&scope=user&state=${state}&allow_signup=false`;
    },

    getAccessToken: function (state, code, redirect_url) {
        const location = 'https://github.com/login/oauth/access_token' +
            `?client_id=${client_id}&client_secret=${client_secret}` +
            `&code=${code}&state=${state}&redirect_url=${redirect_url}`;
        const options = {
            url: location,
            method: 'POST'
        };
        return request(options);
    },

    getUserApps: function (token) {
        const options = {
            url: `https://api.github.com/user/installations?access_token=${token}`,
            method: 'GET',
            headers: {
                'Accept': 'application/vnd.github.machine-man-preview+json',
                'Content-Type': 'application/json',
                'User-Agent': 'node.js'
            }
        };
        return request(options);
    },

    getCurrentUser: async function (token) {
        const options = {
            url: `https://api.github.com/user?access_token=${token}`,
            method: 'GET',
            headers: {
                'Accept': 'application/vnd.github.machine-man-preview+json',
                'Content-Type': 'application/json',
                'User-Agent': 'node.js'
            }
        };
        return request(options);
    },

    createApp: function () {
        async function asInstallation(installationId) {
            const response = await auth({
                type: "installation",
                installationId: installationId,
            });
            //response.token = `token ${response.token}`;
            const github = new Octokit(response);
            return github;
        }

        async function getConfig(username, repo, installationId) {
            const github = await asInstallation(installationId);
            const content = await github.repos.getContent({ owner: username, repo: repo, path: '/.github/github-experts.yml' });
            return content;
        }

        async function gitConfigExists(owner, repo, installationId) {
            try {
                const config = await getConfig(owner, repo, installationId);
                config = JSON.parse(Buffer.from(config.data.content, 'base64'));
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
            const github = await asInstallation(installationId);
            const branches = await github.repos.listBranches({
                owner: owner,
                repo: repo
            });
            const mainBranch = branches.data.filter(i => i.name == mainBranchName);
            const existingConfigBranch = branches.data.filter(i => i.name == configBranchName);
            if (mainBranch.length > 0 && existingConfigBranch.length == 0) {
                const sha = mainBranch[0].commit.sha;
                const newBranch = await github.git.createRef({
                    owner: owner,
                    repo: repo,
                    ref: `refs/heads/${configBranchName}`,
                    sha: sha
                });
                return newBranch;
            } else if (existingConfigBranch.length > 0) {
                return existingConfigBranch[0];
            } else {
                return undefined;
            }
        }

        async function createCommit(owner, repo, installationId, branch, sha, path, message, content) {
            const github = await asInstallation(installationId);
            const encodedContent = Base64.encode(content);
            const commit = await github.repos.createOrUpdateFileContents({
                owner,
                repo,
                branch,
                sha,
                path,
                message,
                content,
                committer: {
                    name: "Github Experts Bot",
                    email: "githubexperts@microsoft.com",
                },
                author: {
                    name: "Github Experts Bot",
                    email: "githubexperts@microsoft.com",
                }
            });
            return commit;
        }

        async function createPullRequest(owner, repo, installationId, title, head, base, body) {
            const github = await asInstallation(installationId);
            const pr = await github.pulls.create({
                owner,
                repo,
                title,
                head,
                base,
                body
            });
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

        return { asInstallation, getConfig, gitConfigExists, createBranch, createCommit, createPullRequest };
    }
};