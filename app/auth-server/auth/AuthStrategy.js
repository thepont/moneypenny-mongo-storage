var passport = require('passport');
var logger = require('auth-server/util/logger');

const ERROR_NO_USER = 'User logged in but no session user found in database';
const ERROR_SERIALIZING_USER = 'User logged in but unable to serialize into database';
const ERROR_NO_SESSION = 'No session found user will not be returned to the correct url';
const DEFAULT_REDIRECT = '/';

passport.serializeUser((user, done) => {
    sessionUserApiStore.save(user).then(user => {
        done(null, user._id);
    }).catch(err => {
        logger.error(ERROR_SERIALIZING_USER);
        done(err, null);
    });
})
passport.deserializeUser(function(id, done) {
    sessionUserApiStore.load(id).then(user => {
        if(user)
        {
            done(null, user);
        }
        else
        {
            //redirect to logout when no user is found
            logger.error(ERROR_NO_USER, id);
            done(ERROR_NO_USER, null);
        }
    }).catch(err => {
        logger.error(err, id);
        done(err, null);
    });
});

var loginRedirectUrl = '/login.html';
module.exports = {
    loginRedirectUrl: loginRedirectUrl,
    ensureAuthenticated: function(req, res, next){
        if(req.isAuthenticated()){
            return next(null);
        }
        if(req.originalUrl && req.session){
            req.session.returnTo = req.originalUrl;
        }
        res.redirect(loginRedirectUrl);
    },
    loginAndRedirect: (req,res,next) => {
        if( req.session && req.session.returnTo ){
            return res.redirect(req.session.returnTo);
        }
        return res.redirect(DEFAULT_REDIRECT);         
    } 
};
