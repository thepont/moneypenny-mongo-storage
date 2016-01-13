![moneypenny-mongo-storage](https://upload.wikimedia.org/wikipedia/en/9/9b/Miss_Moneypenny_by_Lois_Maxwell.jpg)

# moneypenny-mongo-storage - Authentication Service 

mongo storage for moneypanny authentication service.

[![Circle CI](https://circleci.com/gh/blueflag/moneypenny/tree/master.svg?style=shield&circle-token=0627ef84b056dbf221c6b6a5025c101cdfbc8991)](https://circleci.com/gh/blueflag/moneypenny/tree/master) 
[![Coverage Status](https://coveralls.io/repos/blueflag/moneypenny/badge.svg?branch=test&service=github&t=KTAhQi)](https://coveralls.io/github/blueflag/moneypenny?branch=master)

Moneypenny acts as an authentication service that offers multiple authentication strategies to a backend service and sends a [JSON web token](http://jwt.io/)(JWT) encripted using a shared secret as a response.

Other services in the architecture should also know the shared secret allowing the token to be passed around in API calls to provide user information related to the request.

