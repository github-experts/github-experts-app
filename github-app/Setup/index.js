const path = require('path');
const fs = require('fs');
const githubRequests = require('../shared/github');
const pem = fs.readFileSync(path.resolve(__dirname, '../shared/private-key.pem'));
const github_app_id = process.env['GITHUB_APP_ID'];
const github_app = githubRequests.createApp({
    id: github_app_id,
    cert: pem
});

module.exports = async function (context, req) {
    const installationId = 10883173;
    const owner = "geopet"

    // request.body.repository.owner.login, request.body.repository.name, request.body.installation.id

    context.log('JavaScript HTTP trigger function processed a request.');

    if (req.query.name || (req.body && req.body.name)) {
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: "Hello " + (req.query.name || req.body.name)
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a name on the query string or in the request body"
        };
    }
};
