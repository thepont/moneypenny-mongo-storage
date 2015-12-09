'use strict';
var logger = require('winston');

var MONGO_DB_HOST = 'mongo.dev.bigdatr.xyz';
var MONGO_DB = 'toy_auth_manager_sample';

/*
 * Static username and password for test
 * login as 'jsmith' password 'password' 
 */
var USERNAME = 'jsmith';
var PASSWORD = 'password';


//This will be serialized and sent to the client.
var USER = {
    username : 'jsmith',
    haircolour: 'brown'
};
 
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var LocalStrategy = require('passport-local').Strategy;
var passport = require('passport');

// Mongo DB connection for moneypenny-mongo-storage.
var mongodb = require('mongodb');
var mongoServer = new mongodb.Server(MONGO_DB_HOST, 27017, {});

var db = new mongodb.Db(MONGO_DB, mongoServer, {
    w: 1,
    readPreference: mongodb.ReadPreference.SECONDARY_PREFERRED
});
db.open(function(err){
    if(err){
        logger.error(err);
    }
});

// Mongo Auth Storage Configuration
var mongoAuthStorage = require('moneypenny-mongo-storage')({
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
        return done(null, USER);
    }
    else {
        return done(null, false, 'username and/or password incorrect')
    }
}

var moneypennyServer = require('moneypenny-server')({
    storageProvider: mongoAuthStorage,
    loginUrl: '/login.html'
});

passport.serializeUser(moneypennyServer.serializeUser)
passport.deserializeUser(moneypennyServer.deserializeUser)

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
        app.post('/login', passport.authenticate('local'), moneypennyServer.loginAndRedirect);
        done();
    },
    afterRoutes: function(done,app){
        moneypennyServer.initialize(app);
        done();
    }
});
