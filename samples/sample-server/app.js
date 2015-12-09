'use strict';
var logger = require('winston');

var MONGO_DB_HOST = 'mongo.dev.bigdatr.xyz';
var MONGO_DB = 'toy_auth_manager_sample';

var USERNAME = 'jsmith';
var PASSWORD = 'password';

var user = {
    username : 'jsmith',
    haircolour: 'brown'
};


//require('es6-promise').polyfill();
require("babel/register")({
    highlightCode: false,
    ignore: /node_modules\/(?!auth-server)|node-oauth20-provider/    
 });
 

var session = require('express-session');
var FileStore = require('session-file-store')(session);
var LocalStrategy = require('passport-local').Strategy;
var passport = require('passport');

// Mongo DB connection for mongo-auth-storage.
var mongodb = require('mongodb');
var mongoServer = new mongodb.Server(MONGO_DB_HOST, 27017, {});

var db = new mongodb.Db(MONGO_DB, mongoServer, {
    w: 1,
    readPreference: mongodb.ReadPreference.SECONDARY_PREFERRED
});
db.open(function(err){
    if(err)
        logger.error(err);
});

// Mongo Auth Storage Configuration
var mongoAuthStorage = require('mongo-auth-storage')({
    db: db
})

/**
 * Check if the username and password is valid
 * 
 * Checks if username is jsmith and password is passoword
 * @param {String} username username to compare
 * @param {Password} password to compare
 * @param {function()} done callback to call.
 * 
 */
var checkUsernamePassword = function(username, password, done){
    if (username === USERNAME && password == PASSWORD){
        return done(null, user);
    }
    else {
        return done(null, false, 'username and/or password incorrect')
    }
}



var authServer = require('auth-server')
console.log(authServer);
authServer = authServer({
    storageProvider: mongoAuthStorage,
    loginUrl: '/login.html'
});

passport.serializeUser(authServer.serializeUser)
passport.deserializeUser(authServer.deserializeUser)

var config = {
    server: {
        port: parseInt(process.env.PORT || 3000, 10)
    },
    httpsOnly: false,
    __dirname: __dirname,
    routes_root_path: __dirname + '/routes',
    services_root_path: __dirname + '/service',
    static_root_path: __dirname + '/public',
    session: {
        store: new FileStore({}),
        saveUninitialized: true,
        resave: true
    }
};

var elephas = require('elephas')(config);
elephas.createServer({
    beforeMiddleware: function(done, app){
        done();
    },
    beforeRoutes: function(done, app){
        app.use(passport.initialize());
        app.use(passport.session());
        passport.use(new LocalStrategy(checkUsernamePassword));
        app.post('/login', passport.authenticate('local'), authServer.loginAndRedirect);
        done();
    },
    afterRoutes: function(done,app){
        // app.use(authServer.ensureAuthenticated);
        authServer.initialize(app);
        done();
    }
});
