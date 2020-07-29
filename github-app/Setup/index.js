const githubRequests = require('../shared/github');


const github_app = githubRequests.createApp();

module.exports = async function (context, request) {

    context.log('JavaScript HTTP trigger function processed a request.');

    if (request && request.body.installation.id && request.body.repositories.length > 0 && request.body.sender.login) {

        const installationId = request.body.installation.id;
        const repositories = request.body.repositories;
        const owner = request.body.sender.login;

        repositories.forEach(r => {
            const repoName = r.full_name;
            const repoId = r.id;

            try {
                const configExists = github_app.gitConfigExists(owner, repoName, installationId);

                if (!configExists) {
                    
                    // Create branch

                    // Commit config file

                    // Commit a change to README

                    // Open PR

                    context.log(`Configuration created for: ${owner} (${installationId}) ${repoName}`);
                } else {
                    context.log(`Configuration already exists for: ${owner} (${installationId}) ${repoName}`);
                }
            } catch (error) {
                context.log(error);
            }
        });

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
