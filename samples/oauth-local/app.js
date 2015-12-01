var passport = require('passport');
var jwt = require('jsonwebtoken');
var OAuth2Strategy = require('passport-oauth').OAuth2Strategy;
var shortid = require('shortid');
var util = require('util');
var session = require('express-session');
var FileStore = require('session-file-store')(session);

var users = {};

var PROVIDER_NAME = 'auth-server';

var CALLBACK_URL = '/auth/provider/callback';

var CLIENT_ID = 'oAuthTest';
var CLIENT_SECRET = 'production1';
var SERVER_PORT = 3334;
var SERVER_HOST = 'localhost';

var AUTH_PORT = 3000;
var AUTH_HOST = 'localhost'; 

/**
 * Setup routes required for oauth, login page and callback
 */ 
var setupRoutes = function(app){
    app.get(CALLBACK_URL, passport.authenticate(PROVIDER_NAME, { failureRedirect: '/login'}), 
        function(req, res, next){
            return res.json(req.user);
        });
    app.get('/login', passport.authenticate(PROVIDER_NAME));
};

/**
 * Redirect user to login if they are yet to login.
 */ 
var checkAuthenticated = function(req,res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        return res.redirect('/login');
    }
}
/**
 * Render user as JSON once logged in.
 */ 
var showUserDetails = function(req, res, next){
    return res.json(req.user);
}
/*
 * Set up Passports Auth2Stratergy with correct details.
 *
 */ 
passport.use(PROVIDER_NAME, 
        new OAuth2Strategy({
            authorizationURL: util.format('http://%s:%d/oauth2/authorization', AUTH_HOST, AUTH_PORT),
            callbackURL: util.format('http://%s:%d/auth/provider/callback', SERVER_HOST, SERVER_PORT),
            tokenURL: util.format('http://%s:%d/oauth2/token', AUTH_HOST, AUTH_PORT),
            clientID: CLIENT_ID,
            clientSecret : CLIENT_SECRET
        }, 
        function(accessToken, refreshToken, profile, done ){
            console.log('access token:', accessToken, ' refresh token:', refreshToken,'profile', profile);
            if(accessToken){
                // Verify the accessToken using JWT to extract user.
                jwt.verify(accessToken, 'secret', function(err, user){
                    console.log('User Details :', user );
                    done(err, user);
                });
            } else {
                done(new Error('No access token returned from server'));
            }
    }
));

/**
 * Seralize user into memory.
 */
passport.serializeUser(function(user, done){
    try{
        var id = shortid.generate();
        users[id] = user;
        done(null, id);
    }catch (err){
        done(err);
    }
});
/**
 * Deseralize user from memory.
 */ 
passport.deserializeUser(function(id, done){
    try{
        done(null, users[id]);
    }catch (err){
        done(err);
    }
});

var config = {
    server: {
        port: SERVER_PORT
    },
    httpsOnly: false,
    __dirname: __dirname,
    routes_root_path: __dirname + '/',
    services_root_path: __dirname + '/app/auth-server',
    static_root_path: __dirname + '/public',
    session: {
        store: new FileStore({}),
        saveUninitialized: true,
        resave: true,
        secret: 'session_secret'
    }
}
var elephas = require('elephas')(config);

elephas.createServer({
        beforeRoutes: function(done, app){
            app.use(passport.initialize());
            app.use(passport.session());
            //Add oauth routes
            setupRoutes(app);
            //Check that user is authenticated
            app.use(checkAuthenticated);
            //They are authenticated so just show their user details
            app.use(showUserDetails);
            //Log people out on error, it's possibly because sessions are stored in memory
            app.use(function(err, req, res, next) {
                console.error(err.stack);
                req.logout();
                res.status(500).send(err);
            });
            done();
        }
});

