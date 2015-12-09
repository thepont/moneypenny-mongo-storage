var oAuth2RefreshTokenQuery = require('../oAuth2RefreshTokenQuery');
var QueryTests = require('moneypenny-server/util/test/QueryTests')

describe('oAuth2RefreshTokenQuery()', () => {   
    QueryTests.itsAValidQueryObject(oAuth2RefreshTokenQuery);
	describe('tokenEquals()', () => {
		var q = oAuth2RefreshTokenQuery().tokenEquals('test'); 
		QueryTests.itHasCorrectProperties(q);
		it('Creates a query based on the oAuth2 token', () =>{
			q.query.should.have.property('token', 'test');
		});
	});
	describe('clientIdEquals()', () => {
		var q = oAuth2RefreshTokenQuery().clientIdEquals('test'); 
		QueryTests.itHasCorrectProperties(q);
		it('Creates a query based on the clientId', ()=>{
			oAuth2RefreshTokenQuery().clientIdEquals('test').query.should.have.property('clientId', 'test');
		});
	});
	describe('userIdEquals()', () => {
		var q = oAuth2RefreshTokenQuery().userIdEquals('test'); 
		QueryTests.itHasCorrectProperties(q);
		it('Creates a query based on the userId', ()=>{
			q.query.should.have.property('userId', 'test');
		});
	});
});