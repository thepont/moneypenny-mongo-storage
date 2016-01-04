var should = require('should');
var proxyquire = require('proxyquire');
var jwt = require('jsonwebtoken');

describe('index', () => {
    describe('new ()', () => {
        it('Throws an error if no jwt secret is set', (done) => {
            var OAuthClient = require('../index');
            try{
                new OAuthClient({
                    providerHost: 'testProviderHost',
                    serverHost: 'testServerHost',
                    oAuthClientID: 'testClientID',
                    oAuthClientSecret: 'testSecret.'
                });
            } catch (e){
                should.exist(e);
                done();
            }
            
        });
        it('Throws an error if no oauth host is set', (done) => {
            var OAuthClient = require('../index');
            try{
                new OAuthClient({
                    jwtSecret: 'top secret',
                    //providerHost: 'testProviderHost',
                    serverHost: 'testServerHost',
                    oAuthClientID: 'testClientID',
                    oAuthClientSecret: 'testSecret.'
                });
            } catch (e){
                should.exist(e);
                done();
            }
        });
        it('Throws an error if no oauth client secret is set', (done) => {
            var OAuthClient = require('../index');
            try{
                new OAuthClient({
                    jwtSecret: 'top secret',
                    providerHost: 'testProviderHost',
                    // serverHost: 'testServerHost',
                    oAuthClientID: 'testClientID',
                    oAuthClientSecret: 'testSecret.'
                });
            } catch (e){
                should.exist(e);
                done();
            }
        });
        it('Throws an error if no oauth client id is set', (done) => {
            var OAuthClient = require('../index');
            try{
                new OAuthClient({
                    jwtSecret: 'top secret',
                    providerHost: 'testProviderHost',
                    serverHost: 'testServerHost',
                    // oAuthClientID: 'testClientID',
                    oAuthClientSecret: 'testSecret.'
                });
            } catch (e){
                should.exist(e);
                done();
            }
        });
        it('Throws an error if no server host is set', (done) => {
            var OAuthClient = require('../index');
            try{
                new OAuthClient({
                    jwtSecret: 'top secret',
                    providerHost: 'testProviderHost',
                    // serverHost: 'testServerHost',
                    oAuthClientID: 'testClientID',
                    oAuthClientSecret: 'testSecret.'
                });
            } catch (e){
                should.exist(e);
                done();
            }
        });
        it('Creates a new oauthClient if all options are set', (done)=>{
            var OAuthClient = require('../index');
            try{
                var oauthClient =  new OAuthClient({
                    jwtSecret: 'top secret',
                    providerHost: 'testProviderHost',
                    serverHost: 'testServerHost',
                    oAuthClientID: 'testClientID',
                    oAuthClientSecret: 'testSecret.'
                });
                should.exist(oauthClient);
                done();
            } catch (e){
                done(e);
            } 
        });
        describe('passport.serializeUser setup', ()=> {
            var seralizeFn;
            var OAuthClient = proxyquire('../index', {
                passport : {
                    use : () => {},
                    deserializeUser : () => {},
                    serializeUser : (fn) => {
                        seralizeFn = fn;
                    }
                }
            });
            new OAuthClient({
                jwtSecret: 'top secret',
                providerHost: 'testProviderHost',
                serverHost: 'testServerHost',
                oAuthClientID: 'testClientID',
                oAuthClientSecret: 'testSecret.'
            });
            it('adds passport function that serializes user into session using JWT token.', () => {

                seralizeFn({token: 'test'}, (err, userid)=>{
                    userid.should.equal('test');
                    should.not.exist(err);
                });
            });
            it('returns error if it occours', ()=>{
                seralizeFn(null, (err, userid) =>{
                    should.exist(err);
                });
            });
        });
        
        it('adds passport function that deseralizes user from JWT', ()=>{
            var deseralizeFn;
            var OAuthClient = proxyquire('../index', {
                passport : {
                    use : () => {},
                    serializeUser : () => {},
                    deserializeUser : (fn) => {
                        deseralizeFn = fn;
                    }
                }
            });
            new OAuthClient({
                jwtSecret: 'top secret',
                providerHost: 'testProviderHost',
                serverHost: 'testServerHost',
                oAuthClientID: 'testClientID',
                oAuthClientSecret: 'testSecret.'
            });
            var user = {
                name: 'Test User'
            }
            var token = jwt.sign(user, 'top secret');
            deseralizeFn(token, (err, retUser)=>{
                retUser.name.should.equal(user.name);
                should.not.exist(err);
            });
        });
        
        describe('OAuth2Strategy added', ()=> {
            var deseralizeFunction;
            var OAuth2Strategy = function(options, callback){
                deseralizeFunction = callback;
            };
            var OAuthClient = proxyquire('../index', {
                    'passport-oauth' : {
                    OAuth2Strategy : OAuth2Strategy
                    }
            });
            new OAuthClient({
                jwtSecret: 'top secret',
                providerHost: 'testProviderHost',
                serverHost: 'testServerHost',
                oAuthClientID: 'testClientID',
                oAuthClientSecret: 'testSecret.'
            });
            var user = {
                name: 'Test User'
            }
            
            it('Adds OAuth2Strategy to passport that deseralizes from JWT',()=>{
               
                var token = jwt.sign(user, 'top secret');
                deseralizeFunction(token, '', '', (err, retUser)=>{
                    retUser.name.should.equal(user.name);
                    should.not.exist(err);
                });                
            });
            
            it('fails if no token is returned from the server', ()=>{
                deseralizeFunction(null, '', '', (err, retUser)=>{
                    should.exist(err);
                    should.not.exist(retUser);
                });
            });
        });
        
        describe('checkAuthenticated()', ()=>{
            var OAuthClient = require('../index');
            var oauthClient =  new OAuthClient({
                jwtSecret: 'top secret',
                providerHost: 'testProviderHost',
                serverHost: 'testServerHost',
                oAuthClientID: 'testClientID',
                oAuthClientSecret: 'testSecret.'
            });
            
            it('passes request on if it\'s authenticated' , (done)=>{

                oauthClient.checkAuthenticated({isAuthenticated : () => true}, {}, () => {
                    done();
                })
            });
            it('redirects if no authentication is found', (done) => {
                
                var req = {
                        isAuthenticated : () => false,
                        session : {
                            
                        },
                        query: {},
                        headers: {},
                        body: {},
                        originalUrl : 'testurl'
                    }
                // test logic in redirect      
                var redirect = () => {
                    req.session.redirectFrom.should.equal(req.originalUrl);
                    done();
                };
                var res = {
                    redirect : redirect
                }
                         
                oauthClient.checkAuthenticated(req, res, null);
            });
            it('uses localapikey authentication if token is found in header', (done) => {
                var OAuthClient = proxyquire('../index', {
                    'passport-localapikey' : {
                        Strategy : function(){
                            this.name = 'localapikey';
                            this._apiKeyField = 'apikey';
                            this._apiKeyHeader = 'apikey';
                            this.authenticate = function() {
                                done();
                            };
                            
                        }
                    }
                });
                var oauthClient =  new OAuthClient({
                    jwtSecret: 'top secret',
                    providerHost: 'testProviderHost',
                    serverHost: 'testServerHost',
                    oAuthClientID: 'testClientID',
                    oAuthClientSecret: 'testSecret.'
                });
                var req = {
                        isAuthenticated : () => false,
                        session : {
                            
                        },
                        query: {},
                        headers: {
                            apikey : 'test'
                        },
                        body: {},
                        originalUrl : 'testurl'
                    }
                // test logic in redirect      
                var res = {
                }
                oauthClient.checkAuthenticated(req, res, null);
            });
        });
    });
});