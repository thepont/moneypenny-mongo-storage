
var proxyquire = require('proxyquire');
var sinon = require('sinon');

var callsLoginAndRedirect = (path, method) => {
	it('calls login and redirect', () =>{
		var loginAndRedirect = sinon.stub(); 
		var samlRoutes = proxyquire('../saml--routes', {
			'auth-server/auth/AuthStrategy' : {
				loginAndRedirect: () => loginAndRedirect
			}
		});
		samlRoutes[path][method]();
		loginAndRedirect.calledOnce.should.be.true();
	});
}

describe('saml--routes', () => {
	describe('/auth/saml/login/callback', () => {
		describe('POST', () => {
			callsLoginAndRedirect('/auth/saml/login/callback', 'post');
		});
	});
	describe('/auth/saml/login', () => {
		describe('GET', () => {
			callsLoginAndRedirect('/auth/saml/login', 'get');
		});
	});
});