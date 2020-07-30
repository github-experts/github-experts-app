# Setup

1. Create a new Github App in the Github portal.
2. Add Read & Write permissions for Contents and Pull Requests on the Github App settings page.
3. Download and run `ngrok` to proxy webhooks to your local machine (skip for production).
4. Grab the url `ngrok` creates to proxy http/https calls.
5. Add this link `http://NGROK DOMAIN HERE/api/Setup` to your Webhook URL field on the Github App settings page.
6. Generate and download the PEM certificate from the bottom of the Github App settings page.
7. Checkout this repo to your local computer.
8. Create a `local.settings.json` and add this configuration to it:
```
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "",
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "GITHUB_APP_ID": NUMBER LOCATED AT THE TOP OF YOUR GITHUB APP SETTINGS PAGE,
    "GITHUB_CLIENT_ID": "STRING LOCATED AT THE TOP OF YOUR GITHUB APP SETTINGS PAGE",
    "GITHUB_CLIENT_SECRET": "STRING LOCATED AT THE TOP OF YOUR GITHUB APP SETTINGS PAGE"
  }
}
```
9. Run `npm i` to install dependencies.
10. Install your Github App on a repo at least once.
11. Start the Node debugger in VS Code.
12. Use the `Advanced` tab on the Github App settings page to deliver a webhook for testing.