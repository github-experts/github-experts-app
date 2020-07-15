# github-tutors-service

## Setup

### Github

#### Create a Github OAuth app

Set the authorization callback URL to `https://{AAD B2C TENANT}.b2clogin.com/{AAD B2C TENANT}.onmicrosoft.com/oauth2/authresp` and the homepage URL to `https://{APP NAME}.azurewebsites.net`:

![Screenshot showing Github OAuth app setup](https://user-images.githubusercontent.com/1086421/87572569-beb43b00-c699-11ea-86b1-9ad5e0f67202.png)

Copy the client ID and secret:

![Screenshot showing Github OAuth app client ID and secret](https://user-images.githubusercontent.com/1086421/87572921-397d5600-c69a-11ea-93b1-3378b3feee25.png)

### AAD B2C

#### Register an AAD B2C application

Set up redirect URL to EasyAuth to `https://{APP NAME}.azurewebsites.net/.auth/login/aad/callback`:

![Screenshot showing AAD B2C redirect URL](https://user-images.githubusercontent.com/1086421/87571747-895b1d80-c698-11ea-88d3-c995647d939e.png)

Set up access token and ID token implicit grant flow:

![Screenshot showing AAD B2C implicit grant flow](https://user-images.githubusercontent.com/1086421/87571905-b7406200-c698-11ea-8642-0610fac68a84.png)

Copy the application ID:

![Screenshot showing AAD B2C application ID](https://user-images.githubusercontent.com/1086421/87571991-ddfe9880-c698-11ea-836d-4d93769cc0c1.png)

#### Create a "sign up and sign in" user flow

Create Github identity provider by providing the client ID and secret from the Github OAuth app:

![Screenshot showing Github identity provider](https://user-images.githubusercontent.com/1086421/87573035-67fb3100-c69a-11ea-8a85-641c44f0bf42.png)

Select Github as the identity provider:

![Screenshot showing AAD B2C identity provider](https://user-images.githubusercontent.com/1086421/87571558-397c5680-c698-11ea-8405-c6bf03d41f8b.png)

Configure the IDP access token as an application claim:

![Screenshot showing AAD B2C application claim](https://user-images.githubusercontent.com/1086421/87571255-beb33b80-c697-11ea-886d-a738a8b76e11.png)

Copy the issuer URL:

![Screenshot showing AAD B2C issuer URL location](https://user-images.githubusercontent.com/1086421/87571468-194c9780-c698-11ea-90a5-41504143667e.png)

### Azure Function

#### Integrate AAD B2C

Enable EasyAuth:

![Screenshot showing Function EasyAuth setup](https://user-images.githubusercontent.com/1086421/87572185-2ae26f00-c699-11ea-87ac-29891188f3eb.png)

Configure AAD B2C with the client ID and issuer URL from the AAD B2C setup steps:

![Screenshot showing Function EasyAuth configuration](https://user-images.githubusercontent.com/1086421/87572298-536a6900-c699-11ea-91d3-d740b1803064.png)

