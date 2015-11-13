var passport = require('passport');
var loginAndRedirect = require('auth-server/auth/AuthStrategy').loginAndRedirect('/local/login','/local/details','saml');

var routes = {
    '/auth/saml/login/callback' : {
        post : loginAndRedirect
    },
    '/auth/saml/login' : {
        get : function(req, res, next){
            passport.authenticate('saml', { failureRedirect: '/', failureFlash: true },
                function(req, res) {
                    res.redirect('/');
                })(req,res,next)
        }
    }
}
module.exports = routes;
