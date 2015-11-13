var passport = require('passport');

console.log(require('auth-server/auth/AuthStrategy'))
var loginAndRedirect = require('auth-server/auth/AuthStrategy').loginAndRedirect('/local/login','/local/details','local');


var routes = {
    /**
     * Login using the local stratergy. 
     */
    '/auth/local/login' : {
        post : loginAndRedirect
    },
    /**
     * Returns the details of the logged in user.
     */
    '/local/details' : {
        get : function(req,res,next){
            return res.json(req.user);
        }
    }
}

module.exports = routes;
