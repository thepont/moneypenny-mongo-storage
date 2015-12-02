var session = require('express-session');
var FileStore = require('session-file-store')(session);
var AuthClient = require('auth-client');

var PROVIDER_NAME = 'auth-server';
var CLIENT_ID = 'oAuthTest';
var CLIENT_SECRET = 'production1';
var SERVER_PORT = 3334;
var SERVER_HOST = 'localhost';
var AUTH_PORT = 3000;
var AUTH_HOST = 'localhost'; 

var showUserDetails = function(req, res, next){
    return res.json(req.user);
}

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
var authClient = new AuthClient({
    jwtSecret: 'secret',
    providerHost: AUTH_HOST,
    providerPort: AUTH_PORT,
    serverHost: SERVER_HOST,
    serverPort: SERVER_PORT,
    oAuthClientSecret : CLIENT_SECRET,
    oAuthClientID: CLIENT_ID
});

elephas.createServer({
        beforeRoutes: function(done, app){
            authClient.initialize(app);
            app.use(authClient.checkAuthenticated)
            app.use(showUserDetails);
            app.use(function(err, req, res, next) {
                console.error(err.stack);
                res.status(500).send(err);
            });
            done();
        }
});

