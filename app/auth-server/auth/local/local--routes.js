var passport = require('passport');
var routes = {
    /**
     * Login using the local stratergy. 
     */
    '/auth/local/login' : {
        post : (req, res, next) => { 
            passport.authenticate('local', (err,user,info) => {
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
                    if( req.session && req.session.returnTo ){
                        return res.redirect(req.session.returnTo);
                    }
                    return res.redirect('/local/details');
                });            
            })(req, res, next)
        }
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
