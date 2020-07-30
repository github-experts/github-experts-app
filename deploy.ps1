#!/usr/bin/env pwsh

$projectRoot = $(Get-Item $PSCommandPath).Directory.FullName
$username = $env:SP_CLIENT
$password = $env:SP_SECRET
$tenant = $env:SP_TENANT
$b2cClientId = $env:B2C_CLIENT_ID
$b2cTenantName = $env:B2C_TENANT_NAME
$resourceGroup = $env:APP_GROUP
$appName = $env:APP_NAME
$sendgridAPIKey = $env:SENDGRID_API_KEY
$sendGridPassword = $env:SENDGRID_PASSWORD
$githubAppFunctionName = $env:GITHUB_APP_NAME
$githubAppId = $env:GITHUB_APP_ID
$githubAppClientId = $env:GITHUB_CLIENT_ID
$githubAppClientSecret = $env:GITHUB_CLIENT_SECRET

#region Resources

az login `
  --username $username `
  --password $password `
  --tenant $tenant `
  --service-principal

$deployment = az deployment group create `
  --resource-group $resourceGroup `
  --template-file $projectRoot/azuredeploy.json `
  --parameters appName=$appName b2cClientId=$b2cClientId b2cTenantName=$b2cTenantName sendgridPassword=$sendGridPassword sendgridApiKey=$sendgridAPIKey github_app_name=$githubAppFunctionName GITHUB_APP_ID=$githubAppId GITHUB_CLIENT_ID=$githubAppClientId GITHUB_CLIENT_SECRET=$githubAppClientSecret `
  --output json `
| ConvertFrom-Json

$backendFunctionAppName = $deployment.properties.outputs.backendFunctionAppName.value
$backendHostName = $deployment.properties.outputs.backendHostName.value
$frontendStorageAccountResourceId = $deployment.properties.outputs.frontendStorageAccountResourceId.value
$frontendHostName = $deployment.properties.outputs.frontendHostName.value

$frontendStorageAccountConnectionString = az storage account show-connection-string `
  --ids $frontendStorageAccountResourceId `
  --query 'connectionString' `
  --output tsv

az storage blob service-properties update `
  --connection-string $frontendStorageAccountConnectionString `
  --static-website `
  --404-document 'index.html' `
  --index-document 'index.html'

#endregion

#region Backend

Push-Location $projectRoot/github-experts-service

dotnet publish --configuration Release

Compress-Archive `
  -Path ./bin/Release/netcoreapp3.1/* `
  -DestinationPath ./zipdeploy.zip `
  -Force

az functionapp deployment source config-zip `
  --resource-group $resourceGroup `
  --name $backendFunctionAppName `
  --src ./zipdeploy.zip

Pop-Location

#endregion

#region Frontend

Push-Location $projectRoot/github-experts-ui

if (!(Test-Path ./node_modules -PathType Container))
{
  npm install
}

$env:REACT_APP_ROUTE_PREFIX = '/site';
npm run build

az storage blob upload-batch `
  --connection-string $frontendStorageAccountConnectionString `
  --source ./build `
  --destination '$web' `
  --no-progress

Pop-Location

#endregion

#region Github-app

Push-Location $projectRoot/github-app

if (!(Test-Path ./node_modules -PathType Container))
{
  npm install
}

Compress-Archive `
  -Path ./* `
  -DestinationPath ./zipdeploy.zip `
  -Force

az functionapp deployment source config-zip `
  --resource-group $resourceGroup `
  --name $githubAppFunctionName `
  --src ./zipdeploy.zip

Pop-Location
#endregion

Write-Output '===================================================='
Write-Output 'Deployment done!'
Write-Output '----------------------------------------------------'
Write-Output 'Add the following to the B2C application reply URLs:'
Write-Output "    https://$backendHostName/.auth/login/aad/callback"
Write-Output "    https://$backendHostName"
Write-Output "    https://$frontendHostName"
Write-Output '----------------------------------------------------'
Write-Output 'The backend is available at:'
Write-Output "    https://$backendHostName/api"
Write-Output '----------------------------------------------------'
Write-Output 'The frontend is available at:'
Write-Output "    https://$backendHostName/site"
Write-Output '----------------------------------------------------'
Write-Output 'Have a wonderful day!'
Write-Output '===================================================='
