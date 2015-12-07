var loginAndRedirect = require('auth-server/auth/AuthStrategy').loginAndRedirect('/local/login','/local/details','saml');

var routes = {
    '/auth/saml/login/callback' : {
        post : loginAndRedirect
    },
    '/auth/saml/login' : {
        get : loginAndRedirect
    }
}
module.exports = routes;
