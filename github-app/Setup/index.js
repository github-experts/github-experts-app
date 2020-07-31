const githubRequests = require('../shared/github');
const githubApp = githubRequests.createApp();
const yamlConfig = require('../shared/yamlConfig');

CONFIG_PATH = "/.github/github-experts.yml";
README_PATH = "/README.md";

const PULL_REQUEST_HEAD = "bot-github-experts";
const PULL_REQUEST_BRANCH = "master";
const PULL_REQUEST_BODY = `Github Experts connects developers with maintainers and other subject matter experts to discuss 
anything related to the contents of this repo.

 We've prepared a PR that will add an initial configuration file to your \`.github\` directory and a 
link to your README for developers to get in touch with configured experts.

When you're ready to accept requests from Github developers just add this link to your README for everyone 
to see:`;

module.exports = async function (context, request) {

    context.log('Github webhook handler receiving incoming request...');

    if (request && (request.body.action === "created" || request.body.action === "added") && request.body.installation.id && (request.body.repositories || request.body.repositories_added) && request.body.sender.login) {

        const installationId = request.body.installation.id;
        const repositories = request.body.repositories ? request.body.repositories : request.body.repositories_added;
        const owner = request.body.sender.login;

        for (i = 0; i < repositories.length; i++) {
            const repository = repositories[i];
            const repo = repository.name;

            try {
                const configExists = await githubApp.gitConfigExists(owner, repo, installationId, CONFIG_PATH, PULL_REQUEST_BRANCH);
                context.log("Finished looking for: " + CONFIG_PATH);
                if (!configExists) {
                    let branch = await githubApp.createBranch(owner, repo, installationId, PULL_REQUEST_HEAD, PULL_REQUEST_BRANCH);
                    if (branch) {
                        const config = yamlConfig.generate(owner);
                        const configCommit = await githubApp.createCommit(owner, repo, installationId, PULL_REQUEST_HEAD, branch.object.sha, CONFIG_PATH, "Yaml for Github Experts configuration", config);
                        if (configCommit) {
                            // Uncomment to modify the README directly
                            //branch = await githubApp.createBranch(owner, repo, installationId, PULL_REQUEST_HEAD, PULL_REQUEST_BRANCH);
                            //const readmeCommit = await githubApp.createCommit(owner, repo, installationId, PULL_REQUEST_HEAD, branch.commit.sha, README_PATH, "Add Github Experts link to README", `link: ${owner}`);

                            const PULL_REQUEST_TITLE = "Add Github Experts configuration";
                            const README_LINK = `
                            \`\`\`
<a href="https://githubexpertsapi.azurewebsites.net/site/scheduler/${owner}/${repo}">Schedule time with an Expert!</a>
                            \`\`\``;
                            const PR_MESSAGE = PULL_REQUEST_BODY + README_LINK;
                            const pr = await githubApp.createPullRequest(owner, repo, installationId, PULL_REQUEST_TITLE, PULL_REQUEST_HEAD, PULL_REQUEST_BRANCH, PR_MESSAGE);

                            context.log(`Configuration created for: ${owner} (${installationId}) ${repo}`);
                        }
                    } else {
                        context.log(`Branch exists or there was an error fetching details for: ${owner} (${installationId}) ${repo}`)
                    }
                } else {
                    context.log(`Configuration already exists for: ${owner} (${installationId}) ${repo}`);
                }
            } catch (error) {
                context.log(error);
            }
        }

        context.res = {
            // status: 200, /* Defaults to 200 */
            body: `Completed processing.`
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a valid body."
        };
    }
};
