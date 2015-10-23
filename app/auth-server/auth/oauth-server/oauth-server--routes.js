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
        post: function(req, res){
            console.log("===HEADERS===");
            console.log(req.headers);
            console.log("===BODY===");
            console.log(req.body);
            
            console.log('CLIENT ID==============');
            console.log(req.body.client_id);
            console.log('CLIENT SECRET======='); 
            console.log(req.body.client_secret);

            if (req.body.client_id && req.body.client_secret) {
                console.log('HEY GUYS');
            }

            oAuth2Server.controller.token(req, res);
        }
    }
}
module.exports = routes;
