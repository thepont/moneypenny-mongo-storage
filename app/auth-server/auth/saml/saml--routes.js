var passport = require('passport');

var routes = {
    '/auth/saml/login/callback' : {
        post : function(req, res, next){
            passport.authenticate('saml', function(err, user, info){
                console.log("SAML Auth called ", user, req, res);
                if(err){
                    console.log('GOT AN ERROR');
                    return next(err);
                }
                if(!user){
                    return res.redirect('/local/login');
                }
                req.logIn(user, function(err) {
                    if(err){
                        console.log('ERROR in login');
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
    },
    '/auth/test/local/login' : {
        post : function(req, res, next){ 
            passport.authenticate('local', function(err,user,info) {
                if(err){
                    return next(err);
                }
                if(!user){
                    return res.redirect('/local/login'); 
                }
                req.logIn(user, function(err) {
                    if(err){
                        return next(err);
                    }
                    return res.redirect('/local/details');
                });            
            })(req, res, next)
        }
    }
}
module.exports = routes;
