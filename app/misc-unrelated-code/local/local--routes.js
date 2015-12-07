var passport = require('passport');

console.log(require('auth-server/auth/AuthStrategy'))
var loginAndRedirect = require('auth-server/auth/AuthStrategy').loginAndRedirect('/local/login','/local/details','local');


var routes = {
    /**
     * Login using the local stratergy. 
     */
    '/auth/local/login' : {
        post : loginAndRedirect
    }
}

module.exports = routes;
