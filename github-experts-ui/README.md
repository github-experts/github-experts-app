# github-experts-ui

## Setup

### Create Azure static website

```sh
az group create --name hackathon --location EastUS
az storage account create --name githubtutorsui --kind StorageV2 --sku Standard_LRS --resource-group hackathon
az storage blob service-properties update --account-name githubtutorsui --static-website --index-document index.html
az storage account show --name githubtutorsui --query primaryEndpoints.web --output tsv
```

### Publish UI to static website

```sh
npm run build
az storage blob upload-batch --source build --destination '$web' --account-name githubtutorsui
```
