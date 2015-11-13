var passport = require('passport');

var routes = {
    '/auth/saml/login/callback' : {
        post : function(req, res, next){
            passport.authenticate('saml', function(err, user, info){
                if(err){
                    return next(err);
                }
                req.logIn(user, function(err) {
                    if(err){
                        return next(err);
                    }
                    return res.redirect('/local/details');
                });
            })(req, res, next)
        }
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
