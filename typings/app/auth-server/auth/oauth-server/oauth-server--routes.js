var oAuth2Server = require('auth-server/auth/oauth-server/oAuth2Server');

var routes = {
    /**
     * Called when a user requests authentication from the server.
     */ 
    '/oauth2/authorization' : {
        get : oAuth2Server.controller.authorization      
        
    },
    /**
     * Called when the remote server requests a token from the server.
     */ 
    '/oauth2/token' : {
        get: oAuth2Server.controller.token
    }
}
module.exports = routes;
