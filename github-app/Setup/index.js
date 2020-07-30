const githubRequests = require('../shared/github');
const githubApp = githubRequests.createApp();

CONFIG_PATH = "/.github/github-experts.yml";
README_PATH = "/README.md";

const PULL_REQUEST_HEAD = "bot-github-experts-config";
const PULL_REQUEST_BRANCH = "master";
const PULL_REQUEST_TITLE = "Add Github Experts configuration";
const PULL_REQUEST_BODY = `Github Experts connects developers with maintainers and other 
subject matter experts to discuss anything related to the contents 
of this repo.

We've prepared a PR that will add an initial configuration file to your
\`.github\` directory and a link to your README for developers to get in 
touch with configured experts.`;

module.exports = async function (context, request) {

    context.log('JavaScript HTTP trigger function processed a request.');

    if (request && request.body.installation.id && request.body.repositories.length > 0 && request.body.sender.login) {

        const installationId = request.body.installation.id;
        const repositories = request.body.repositories;
        const owner = request.body.sender.login;

        for (i = 0; i < repositories.length; i++) {
            const repository = repositories[i];
            const repo = repository.name;
            const repoId = repository.id;

            try {
                const configExists = github_app.gitConfigExists(owner, repo, installationId);

                if (!configExists) {

                    // Create branch
                    const branch = await githubApp.createBranchFromMain(owner, repo, installationId, PULL_REQUEST_HEAD, PULL_REQUEST_BRANCH);

                    // Commit config file
                    createCommit(owner, repo, installationId, PULL_REQUEST_HEAD, branch.commit.sha, CONFIG_PATH, "Yaml for Github Experts configuration", `yml: ${owner}`);
                    createCommit(owner, repo, installationId, PULL_REQUEST_HEAD, branch.commit.sha, CONFIG_PATH, "Add Github Experts link to README", `link: ${owner}`);

                    // Open PR
                    octokit.pulls.create({
                        owner,
                        repo,
                        title: PULL_REQUEST_TITLE,
                        head: PULL_REQUEST_HEAD,
                        base: PULL_REQUEST_BODY,
                        body: PULL_REQUEST_BODY
                      });

                    context.log(`Configuration created for: ${owner} (${installationId}) ${repoName}`);
                } else {
                    context.log(`Configuration already exists for: ${owner} (${installationId}) ${repoName}`);
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
