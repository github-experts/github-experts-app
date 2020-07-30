const request = require('request-promise');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const { createAppAuth } = require("@octokit/auth-app");
const { Octokit } = require("@octokit/rest");

const githubAppId = process.env['GITHUB_APP_ID'];
const pem = fs.readFileSync(path.resolve(__dirname, './private-key.pem'));
const auth = createAppAuth({
    id: githubAppId,
    privateKey: pem,
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
            response.token = `token ${response.token}`;
            const github = new Octokit(response);
            return github;
        }

        async function getConfig(username, repo, installationId) {
            const github = await asInstallation(installationId);
            const content = github.repos.getContent({ owner: username, repo: repo, path: '/README.md' });
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
                Promise.reject(error);
            }
        }

        async function createBranch(owner, repo, installationId, configBranchName, mainBranchName) {
            const github = await asInstallation(installationId);
            const branches = await github.repos.listBranches({
                owner: owner,
                repo: repo
            });
            const mainBranch = branches.filter(i => i.name == mainBranchName);
            const existingConfigBranch = branches.reduce((a, v) => !a && v.name == configBranchName, false);
            if (main.length > 0 && !existingConfigBranch) {
                const sha = main[0].commit.sha;
                const newBranch = github.git.createRef({
                    owner: owner,
                    repo: repo,
                    ref: branchName,
                    sha: mainBranch.sha
                });
                return newBranch;
            } else {
                return undefined;
            }
        }

        async function createCommit(owner, repo, installationId, branch, sha, path, message, content) {
            const github = await asInstallation(installationId);
            await github.repos.createOrUpdateFile({
                owner,
                repo,
                branch,
                sha,
                path,
                message,
                content,
                committer.name: "Github Experts Bot",
                committer.email: "githubexperts@microsoft.com",
                author.name: "Github Experts Bot",
                author.email: "githubexperts@microsoft.com"
            });
        }

        function generateJwt(id, cert) {
            const payload = {
                iat: Math.floor(new Date() / 1000),       // Issued at time
                exp: Math.floor(new Date() / 1000) + 60,  // JWT expiration time
                iss: id                                   // Integration's GitHub id
            };
            return jwt.sign(payload, cert, { algorithm: 'RS256' });
        }

        return { asInstallation, createToken, getConfig, gitConfigExists, createBranchFromMain };
    }
};