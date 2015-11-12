'use strict';
require('dotenv').load();
//require('es6-promise').polyfill();
require("babel/register")({
    highlightCode: false,
    ignore: /node_modules\/(?!auth-server)|node-oauth20-provider/    
 });
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var fs = require('fs');

var passport = require('passport');

var anotherlineofcode = 1;

var config = {
    server: {
        port: parseInt(process.env.PORT || 3000, 10)
    },
    httpsOnly: false,
    __dirname: __dirname,
    routes_root_path: __dirname + '/app/auth-server',
    services_root_path: __dirname + '/app/auth-server',
    static_root_path: __dirname + '/public',
    session: {
        store: new FileStore({}),
        saveUninitialized: true,
        resave: true,
        secret: 'UvIx0ANvWDg5U6P3AzI2lv4IaGl8jV3i'
    }
};
var authStrategy = require('auth-server/auth/AuthStrategy');
var oAuth2Server = require('auth-server/auth/oauth-server/oAuth2Server');
var elephas = require('elephas')(config);
elephas.createServer({
    beforeMiddleware: function(done, app){
        done();
    },
    beforeRoutes: function(done, app){
        app.use(passport.initialize());
        app.use(passport.session());
        app.use(oAuth2Server.inject());
        app.use(authStrategy.ensureAuthenticated);
        done();
    },
    afterRoutes: function(done,app){
        done();
    }
});
