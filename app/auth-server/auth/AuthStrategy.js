var MongoLocalStrategy = require('auth-server/auth/local/MongoLocalStrategy');
var SamlStrategy = require('auth-server/auth/saml/SamlAuthStrategy');
var sessionUserApiStore = require('auth-server/auth/session/SessionUserApiStore');
var passport = require('passport');
var logger = require('auth-server/util/logger');

const NO_AUTH_REQUIRED = ['/login.html', '/auth/local/login', '/auth/saml/login/callback', '/auth/saml/login'];

const ERROR_NO_USER = 'User logged in but no session user found in database';
const ERROR_SERIALIZING_USER = 'User logged in but unable to serialize into database';
const ERROR_NO_SESSION = 'No session found user will not be returned to the correct url';

passport.use(MongoLocalStrategy);
passport.use(SamlStrategy);
passport.serializeUser((user, done) => {
    console.log(user);
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
            //redirect to logout when this happens
            logger.error(ERROR_NO_USER, id);
            done(ERROR_NO_USER, null);
        }
    }).catch(err => {
        done(err, null);
    });
});


module.exports = {
    ensureAuthenticated: function(req, res, next){
        var authNotRequired;
        if(req.isAuthenticated()){
            return next();
        }
        authNotRequired = NO_AUTH_REQUIRED.find(p => req.path === p);
        if (authNotRequired){
            return next();
        }
        else {
            if(req.path && req.session){
                req.session.returnTo = req.originalUrl;
            } else {
                req.session.returnTo = '/';
            }
            res.redirect('/login.html');
        }
    },
    redirectAuthenticated: function(req, res){
        if( req.session && req.session.returnTo ){
            res.redirect(req.session.returnTo);
        } else {
            logger.error(ERROR_NO_SESSION);
            res.redirect('/');
        }
    }
};
