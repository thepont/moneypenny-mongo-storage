![moneypenny-mongo-storage](https://upload.wikimedia.org/wikipedia/en/9/9b/Miss_Moneypenny_by_Lois_Maxwell.jpg)

# moneypenny-mongo-storage
## Moneypenny Authentication Service Mongo Storage Provider.

mongo storage for moneypanny authentication service.

[![Circle CI](https://circleci.com/gh/blueflag/moneypenny/tree/master.svg?style=shield&circle-token=0627ef84b056dbf221c6b6a5025c101cdfbc8991)](https://circleci.com/gh/blueflag/moneypenny/tree/master) 
[![Coverage Status](https://coveralls.io/repos/blueflag/moneypenny/badge.svg?branch=test&service=github&t=KTAhQi)](https://coveralls.io/github/blueflag/moneypenny?branch=master)

Moneypenny acts as an authentication service that offers multiple authentication strategies to a backend service and sends a [JSON web token](http://jwt.io/)(JWT) encripted using a shared secret as a response.

Other services in the architecture should also know the shared secret allowing the token to be passed around in API calls to provide user information related to the request.

##MongoDB Collections.

###local_users
A list of local users, use for a local authentication stratergy on moneypenny.

_In the future a remote trusted server should be able to do a POST request with local user details and get a JWT as a response_ 

###oauth_client_store
A list of oAuth2 clients and their shared secrets _(different shared secret from JWT)_ 

###oauth_code_store
A list of oAuth2 codes, this code is past via the web browser on an oAuth 2 request and is then used to request a token.

The tokens are also JWT currently and are encoded with the same key. _although this should be different since they are seen by the web client_. 

###oauth_refresh_token

A list of refresh tokens that are used to refresh the oauth token when it expires.

###oauth_token

A list of the oAuth tokens that have been sent to the services, these tokens are also JWT, and therefor services that get access tokens from the service can decode user information from the access token, and pass the access tokens to other services.

###session_users

Users logged into sessions on the server, This list contains both SAML and Local users, and is the user encoded in the JWT.
