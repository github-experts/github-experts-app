const request = require('request-promise');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const { createAppAuth } = require("@octokit/auth-app");
const { Octokit } = require("@octokit/rest");

const github_app_id = process.env['GITHUB_APP_ID'];

const pem = fs.readFileSync(path.resolve(__dirname, './private-key.pem'));

const auth = createAppAuth({
    id: github_app_id,
    privateKey: pem,
});


module.exports = {
    //Gets the url for starting Oauth2 flow.
    getIdentityRequestUrl: function (state, redirect_url) {
        return 'https://github.com/login/oauth/authorize' +
            `?client_id=${client_id}&redirect_url=${redirect_url}` +
            `&scope=user&state=${state}&allow_signup=false`;
    },

    //Retrieves access token by auth code (2nd stage of Oauth2).
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

    //Gets all the GitHub apps installed for the specified user (by his token).
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

    //Gets the current user account information.
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

    //Encapsulates GitHub logic accessed via GitHub app.
    createApp: function () {
        // Authenticates as the given installation of the GitHub app, which gives us access to actions in user repo.
        async function asInstallation(installationId) {
            const response = await auth({
                type: "installation",
                installationId: installationId,
            });
            response.token = `token ${response.token}`;
            const github = new Octokit(response);
            return github;
        }

        // https://developer.github.com/early-access/integrations/authentication/#as-an-installation
        async function createToken(installationId) {
            const github = await asApp();
            return github.apps.createInstallationToken({ installation_id: installationId });
        }

        //Gets json config file from the root of the user repository.
        async function getConfig(username, repo, installationId) {
            const github = await asInstallation(installationId);
            const content = github.repos.getContent({ owner: username, repo: repo, path: '/README.md' });
            return content;
        }

        async function gitConfigExists(githubUsername, repoName, installationId) {
            try {
                const config = await getConfig(githubUsername, repoName, installationId);
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

        async function createBranchFromMain(owner, repo, installationId, branchName) {
            const github = await asInstallation(installationId);
            const ref = "heads/master";
            const branches = await github.repos.listBranches({
                owner: owner,
                repo: repo
            });

            console.log(github);
            const mainBranch = github.git.createRef({
                owner: owner,
                repo: repo,
                ref: branchName,
                sha: mainBranch.sha
            });
        }


        //Generates jwt signature for GitHub app authentication from the private key and GitHub app id.
        function generateJwt(id, cert) {
            const payload = {
                iat: Math.floor(new Date() / 1000),       // Issued at time
                exp: Math.floor(new Date() / 1000) + 60,  // JWT expiration time
                iss: id                                   // Integration's GitHub id
            };

            // Sign with RSA SHA256
            return jwt.sign(payload, cert, { algorithm: 'RS256' });
        }

        return { asInstallation, createToken, getConfig, gitConfigExists, createBranchFromMain };
    }
};