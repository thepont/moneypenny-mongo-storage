var proxyquire = require('proxyquire');
var sinon = require('sinon');
var should = require('should');

var loginRedirect = '/local/login';
var defaultRedirect = '/local/details';
var strategy = 'local';

describe('AuthStrategy', ()=>{
	describe('loginAndRedirect', ()=>{
		it('Returns an error to the next middleware if an error occours', (done) => {
			var authStategy = proxyquire('../AuthStrategy', {
				passport: {
					authenticate: (stratergy, cb) => () => cb('err'),
					use: () => {},
					serializeUser: () => {},
					deserializeUser: () => {},
				}
			})
			var loginAndRedirect = authStategy.loginAndRedirect(loginRedirect,defaultRedirect,strategy);
			loginAndRedirect(null, null, (err) => {
				should.exist(err);
				done();
			});
		});
		it('Redirects to the login page if no user is found', () => {
			
			var authStategy = proxyquire('../AuthStrategy', {
				passport: {
					authenticate: (stratergy, cb) => () => cb(null, null),
					use: () => {},
					serializeUser: () => {},
					deserializeUser: () => {},
				}
			})
			var res = {
				redirect: sinon.stub().returns({})
			}
			var loginAndRedirect = authStategy.loginAndRedirect(loginRedirect,defaultRedirect,strategy);
			
			loginAndRedirect(null, res, (err) => {
				should.not.exist(err);
			});
			res.redirect.calledWithMatch(loginRedirect).should.be.true();
		});					
		it('It logs the user in and redirects to the user redirect url if found', () => {
			
			var authStategy = proxyquire('../AuthStrategy', {
				passport: {
					authenticate: (stratergy, cb) => () => cb(null, {}),
					use: () => {},
					serializeUser: () => {},
					deserializeUser: () => {},
				}
			})
			var loginAndRedirect = authStategy.loginAndRedirect(loginRedirect,defaultRedirect,strategy);
			var res = {
				redirect: sinon.stub().returns({})
			}
			var req = {
				logIn : (user, cb) => cb(),
				session : {
					returnTo : 'UrlGoesHere'
				}
			};
			
			loginAndRedirect(req, res, (err) => {
				should.not.exist(err);
			});
			res.redirect.calledWithMatch(req.session.returnTo).should.be.true();
			
		});
		it('It logs the user in and redirects to the user /local/details if redirect not found', () => {
			var authStategy = proxyquire('../AuthStrategy', {
				passport: {
					authenticate: (stratergy, cb) => () => cb(null, {}),
					use: () => {},
					serializeUser: () => {},
					deserializeUser: () => {},
				}
			})
			var loginAndRedirect = authStategy.loginAndRedirect(loginRedirect,defaultRedirect,strategy);
			
			var res = {
				redirect: sinon.stub().returns({})
			}
			var req = {
				logIn : (user, cb) => cb(),
				session : {
				}
			};
			
			loginAndRedirect(req, res, (err) => {
				should.not.exist(err);
			});
			res.redirect.calledWithMatch('/local/details').should.be.true();
		});
		it('Returns an error to the next middleware if an error occours logging in', (done) => {
			var authStategy = proxyquire('../AuthStrategy', {
				passport: {
					authenticate: (stratergy, cb) => () => cb(null, {}),
					use: () => {},
					serializeUser: () => {},
					deserializeUser: () => {},
				}
			})
			var loginAndRedirect = authStategy.loginAndRedirect(loginRedirect,defaultRedirect,strategy);
			var res = {
				redirect: sinon.stub().returns({})
			}
			var req = {
				logIn : (user, cb) => cb('err'),
				session : {
				}
			};
			
			loginAndRedirect(req, res, (err) => {
				should.exist(err);
				done()
			});
		});
	});
})
	