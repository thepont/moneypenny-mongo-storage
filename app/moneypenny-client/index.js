var passport = require('passport');
var jwt = require('jsonwebtoken');
var util = require('util');

/* Used for authenticating against remote authentication server */
var OAuth2Strategy = require('passport-oauth').OAuth2Strategy;
/* Used for authenticating between services using API keys */
var LocalAPIKeyStrategy = require('passport-localapikey').Strategy;

var LOGIN_URI = '/login';
var DEFAULT_AUTHORIZATION_URI = '/oauth2/authorization';
var DEFAULT_TOKEN_URI = '/oauth2/token';
var DEFAULT_CALLBACK_URI = '/auth/provider/callback';
var DEFAULT_PROVIDER_NAME = 'auth-server';
var DEFAULT_PROVIDER_PORT = 443;
var DEFAULT_SERVER_PORT = 443;



var userFromJwt = function(jwtSecret){ 
	return function(token, callback){
		jwt.verify(token, jwtSecret, function(err, user){
			user.token = token;
			callback(err, user);
		});
	}
}

/***
 * options
* 		* loginUrl - URL on the local service to direct people to for login.
* 		* authorizationUrl - URL on the remote authentication server where the user requests authentication
*       * tokenUrl - URL on the remote autnetication server where this server requests token
* 		* providerName - name of the provider, unimportant only used internally
* 		* providerHost - web accessable host name of the authentication server.
* 		* 
 */

module.exports = function(options){
	
	// Secret for JWTs
	var jwtSecret = setOptionOrError('jwtSecret'); 
	// Authentication Server Details
	var providerHost = setOptionOrError('providerHost'); 
	var providerPort = setOptionOrDefault('providerPort',DEFAULT_PROVIDER_PORT);
	var providerName = setOptionOrDefault('providerName',DEFAULT_PROVIDER_NAME);
	// Service external details
	var serverHost = setOptionOrError('serverHost');
	var serverPort = setOptionOrDefault('serverPort',DEFAULT_SERVER_PORT);
	// oAuth Details
	var oAuthClientSecret = setOptionOrError('oAuthClientSecret');
	var oAuthClientID = setOptionOrError('oAuthClientID');
	var authorizationURI = setOptionOrDefault('authorizationURI', DEFAULT_AUTHORIZATION_URI);
	var tokenURI = setOptionOrDefault('authorizationURI', DEFAULT_TOKEN_URI);
	var callbackURI =  setOptionOrDefault('callbackURI', DEFAULT_CALLBACK_URI);
	var loginUri = setOptionOrDefault('loginUri', LOGIN_URI);

	//APIKeyStrategy and extract users from JWT.
	var apiKeyStrategy = new LocalAPIKeyStrategy(userFromJwt(jwtSecret))
	
	var apiKeyField = apiKeyStrategy._apiKeyField;
	var apiKeyHeaderField = apiKeyStrategy._apiKeyHeader
	
	function setOptionOrError(name){
		if ( !options[name] ){
			throw Error("option " + name + " not set, unable to setup authentication");
		}
		return options[name];
	}
	
	function setOptionOrDefault(name, defaultOption){
		return options[name] || defaultOption;
	}
	
	
	var setupRoutes = function(app){
		app.get(callbackURI, 
			passport.authenticate(providerName, {failureRedirect: loginUri}),
				function(req, res, next){
					return res.json(req.user);
				});
				
		app.get(loginUri, passport.authenticate(providerName));
	}

	/*
	 * Passport setup
	 *
	 * Use passport oAuth to connect to authentication server.
	 */
	passport.use(providerName,
			new OAuth2Strategy({
				authorizationURL: util.format('http://%s:%d%s', providerHost, providerPort, authorizationURI),
				tokenURL: util.format('http://%s:%d%s', providerHost, providerPort, tokenURI),
				callbackURL: util.format('http://%s:%d%s', serverHost, serverPort, callbackURI),
				clientID: oAuthClientID,
				clientSecret : oAuthClientSecret
			},
			function(accessToken, refreshToken, profile, done ){
				if(accessToken){
					// Verify the accessToken using JWT to extract user.
					userFromJwt(jwtSecret)(accessToken, done);
				} else {
					done(new Error('No access token returned from server'));
				}
		}
	));

	/*
	 * Passport setup
	 *
	 * Use passport APIKeyStrategy and extract users from JWT.
	 */
	passport.use(apiKeyStrategy);		
	
	/*
	 * Seralize user, save token to session
	 */
	passport.serializeUser(function(user, done){
		try{
			done(null, user.token);
		}catch (err){
			done(err);
		}
	});
	
	/*
	 * Deserialize user by extracting it from JWT.
	 */
	passport.deserializeUser(userFromJwt(jwtSecret));	
	
	this.checkAuthenticated = function(req, res, next){
		if(req.isAuthenticated()){
			return next();
		} else {
			if (!req.query[apiKeyField] && !req.body[apiKeyField] && !req.headers[apiKeyHeaderField]){
				req.session.redirectFrom = req.originalUrl;
				return res.redirect(loginUri);
			} else {
				return passport.authenticate(['localapikey'], { session: false })(req, res, next);
			}
		}
	}
	
	this.initialize = function(app){
		app.use(passport.initialize());
		app.use(passport.session());
		setupRoutes(app);
	}
}

