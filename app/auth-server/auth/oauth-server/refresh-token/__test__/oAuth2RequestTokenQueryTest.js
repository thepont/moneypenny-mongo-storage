var oAuth2RefreshTokenQuery = require('../oAuth2RefreshTokenQuery');
var QueryTests = require('auth-server/util/test/QueryTests')

describe('oAuth2CodeQuery()', () => {   
    QueryTests.itsAValidQueryObject(oAuth2RefreshTokenQuery);
   	it('Creates a query based on the oAuth2 token', () =>{
		oAuth2RefreshTokenQuery().tokenEquals('test').query.should.have.property('token', 'test');
	});
	it('Creates a query based on the clientId', ()=>{
		oAuth2RefreshTokenQuery().clientIdEquals('test').query.should.have.property('clientId', 'test');
	});
	it('Creates a query based on the userId', ()=>{
		oAuth2RefreshTokenQuery().userIdEquals('test').query.should.have.property('userId', 'test');
	});
});