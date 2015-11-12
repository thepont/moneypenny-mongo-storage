var should = require('should');
var proxyquire = require('proxyquire');
var sinon = require('sinon');

describe('local--routes', () => {   
	describe('/auth/local/login', () => {
		describe('POST', () => { 
			it('Returns an error to the next middleware if an error occours', (done) => {
				var localRoutes = proxyquire('../local--routes', {
					passport: {
						authenticate: (stratergy, cb) => () => cb('err')
					}
				})
				
				localRoutes['/auth/local/login']
				.post(null, null, (err) => {
					should.exist(err);
					done();
				});
				
			});
			it('Redirects to the login page if no user is found', () => {
				var localRoutes = proxyquire('../local--routes', {
					passport: {
						authenticate: (stratergy, cb) => () => cb(null, null)
					}
				})
				var res = {
					redirect: sinon.stub().returns({})
				}
				
				localRoutes['/auth/local/login']
				.post(null, res, (err) => {
					should.not.exist(err);
				});
				res.redirect.calledWithMatch('/local/login').should.be.true();
			});					
			it('It logs the user in and redirects to the user redirect url if found', () => {
				
				var localRoutes = proxyquire('../local--routes', {
					passport: {
						authenticate: (stratergy, cb) => () => cb(null, {})
					}
				})
				var res = {
					redirect: sinon.stub().returns({})
				}
				var req = {
					logIn : (user, cb) => cb(),
					session : {
						returnTo : 'UrlGoesHere'
					}
				};
				
				localRoutes['/auth/local/login']
				.post(req, res, (err) => {
					should.not.exist(err);
				});
				res.redirect.calledWithMatch(req.session.returnTo).should.be.true();
				
			});
			it('It logs the user in and redirects to the user /local/details if redirect not found', () => {
				var localRoutes = proxyquire('../local--routes', {
					passport: {
						authenticate: (stratergy, cb) => () => cb(null, {})
					}
				})
				var res = {
					redirect: sinon.stub().returns({})
				}
				var req = {
					logIn : (user, cb) => cb(),
					session : {
					}
				};
				
				localRoutes['/auth/local/login']
				.post(req, res, (err) => {
					should.not.exist(err);
				});
				res.redirect.calledWithMatch('/local/details').should.be.true();
			});
			it('Returns an error to the next middleware if an error occours logging in', (done) => {
				var localRoutes = proxyquire('../local--routes', {
					passport: {
						authenticate: (stratergy, cb) => () => cb(null, {})
					}
				})
				var res = {
					redirect: sinon.stub().returns({})
				}
				var req = {
					logIn : (user, cb) => cb('err'),
					session : {
					}
				};
				
				localRoutes['/auth/local/login']
				.post(req, res, (err) => {
					should.exist(err);
					done();
				});
			});
		});
	});
	
	describe('/auth/local/login', () => {
		describe('GET', () => { 
			it('Returns the current user details as a JSON object', () => {
				var user = {
					username: 'pesson',
					fullname: 'John Smith',
					nickname: 'Rodger'
				};
				var res = {
					json: (obj) => obj
				};
				
				var localRoutes = require('../local--routes');
				localRoutes['/local/details'].get({user: user}, res, {})
					.should.equal(user);
					
			});
		});
	});
});   
