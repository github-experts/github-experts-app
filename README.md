# github-experts-app

[Product Spec Document](https://microsoft-my.sharepoint.com/:w:/p/panikole/EdCE5t9cWE9GpAbjg3tDrooBvJyDWIMtD19TJxV4bPciyg?e=9FP0OQ)

## Continuous integration and deployment

[![Linting Github Action](https://github.com/github-experts/github-experts-app/workflows/lint/badge.svg)](https://github.com/github-experts/github-experts-app/actions?query=workflow%3Alint)

[![Deployment Github Action](https://github.com/github-experts/github-experts-app/workflows/deploy/badge.svg)](https://github.com/github-experts/github-experts-app/actions?query=workflow%3Adeploy)

### One-time setup

```pwsh
$resourceGroup = az group create --name github-experts --location SouthCentralUS --output json | ConvertFrom-Json
$servicePrincipal = az ad sp create-for-rbac --name github-experts --skip-assignment --output json | ConvertFrom-Json
az role assignment create --scope $resourceGroup.id --role Contributor --assignee $servicePrincipal.appId | Out-Null
```

### Postman Collection

A Postman collection can be imported via `Hackathon.postman_collection.json` file.