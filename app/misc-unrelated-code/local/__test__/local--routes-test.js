var should = require('should');
var proxyquire = require('proxyquire');
var sinon = require('sinon');

describe('local--routes', () => {   
	describe('/auth/local/login', () => {
		describe('POST', () => { 
			it('Calls loginAndRedirect to login the user and redirect', () => {
				var loginAndRedirect = sinon.stub();
				var localRoutes = proxyquire('../local--routes', {
					'auth-server/auth/AuthStrategy' : {
						loginAndRedirect : () => loginAndRedirect
					}
				});
				var req = 'request';
				var res = 'response';
				localRoutes['/auth/local/login'].post(req, res);
				loginAndRedirect.calledWithMatch(req, res).should.be.true();
			});
		});
	});
}