
var oAuth2TokenQuery = require('../oAuth2TokenQuery');
var QueryTests = require('auth-server/util/test/QueryTests')

describe('oAuth2TokenQuery()', () => {   
    QueryTests.itsAValidQueryObject(oAuth2TokenQuery);
   	it('Creates a query based on the token', () =>{
		   oAuth2TokenQuery().tokenEquals('test').query.should.have.property('token', 'test');
	});
	it('Creates a query based on the clientid', () =>{
		   oAuth2TokenQuery().clientIdEquals('test').query.should.have.property('clientId', 'test');
	});
	it('Creates a query based on the clientid', () =>{
		   oAuth2TokenQuery().userIdEquals('test').query.should.have.property('userId', 'test');
	});
});