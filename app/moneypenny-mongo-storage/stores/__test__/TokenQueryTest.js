
var oAuth2TokenQuery = require('../TokenQuery');
var QueryTests = require('moneypenny-mongo-storage/util/test/QueryTests');

describe('TokenQuery()', () => {   
    QueryTests.itsAValidQueryObject(oAuth2TokenQuery);
	describe('tokenEquals()', () => {
		var q = oAuth2TokenQuery().tokenEquals('test');
		QueryTests.itHasCorrectProperties(q);
		it('Creates a query based on the token', () =>{
			q.query.should.have.property('token', 'test');
		});
	});
	describe('clientIdEquals()', () => {
		var q = oAuth2TokenQuery().clientIdEquals('test');
		QueryTests.itHasCorrectProperties(q);
		it('Creates a query based on the clientid', () =>{
			q.query.should.have.property('clientId', 'test');
		});
	});
	describe('userIdEquals()', () => {
		var q = oAuth2TokenQuery().userIdEquals('test'); 
		QueryTests.itHasCorrectProperties(q);
		it('Creates a query based on the clientid', () =>{
			q.query.should.have.property('userId', 'test');
		});
	});
});