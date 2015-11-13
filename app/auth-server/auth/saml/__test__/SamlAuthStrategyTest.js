
var proxyquire = require('proxyquire');
var sinon = require('sinon');
describe('SamlStrategy', () => {
	it('Exposes the saml auth strategy', () =>{
		var SamlStrategy = sinon.stub();
		var samlRoutes = proxyquire('../SamlAuthStrategy', {
			'passport-saml' : {
				Strategy: SamlStrategy
			} 
		});
		SamlStrategy.calledWithNew().should.be.true();	
	});
	it('Calls back with the profile.issuer.$ on success', (done) =>{
		var profile = {
			issuer : {
				$ : 'test'
			}
		}
		var callbackFunc;
		var samlRoutes = proxyquire('../SamlAuthStrategy', {
			'passport-saml' :{
				Strategy: (options, func) => {
					console.log(options, func)
					callbackFunc = func;
				}
			}
		});
		callbackFunc(profile, (err, user) => {
			try {
				user.should.equal(profile.issuer.$);
				done();
			} catch(err) {
				done(err);
			}
		})	
	});
});