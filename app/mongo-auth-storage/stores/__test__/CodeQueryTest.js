
var OAuth2CodeQuery = require('../CodeQuery');
var QueryTests = require('auth-server/util/test/QueryTests')

describe('CodeQuery()', () => {   
    QueryTests.itsAValidQueryObject(OAuth2CodeQuery);
	describe('codeEquals()', () => {
		it('Creates a query based on the auth code', () =>{
			OAuth2CodeQuery().codeEquals('test').query.should.have.property('code', 'test');
		});
	});
});
