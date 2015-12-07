
var UserQuery = require('../UserQuery');
var QueryTests = require('auth-server/util/test/QueryTests')

describe('UserQuery()', () => {   
    QueryTests.itsAValidQueryObject(UserQuery);
	
   	it('Creates a query based on the username', () =>{
		   UserQuery().usernameEquals('test').query.should.have.property('username', 'test');
	});
	it('Creates a query based on the username ignoring case', () =>{
		var mongoQuery = UserQuery().usernameEqualsIgnoreCase('test').query;
		mongoQuery.should.have.property('username');
		mongoQuery.username.test('TeSt').should.be.true();
		   
	});
	it('Creates a query based on the user id', () =>{
		UserQuery().idEquals('test').query.should.have.property('userId', 'test');
	});
	it('Creates a query looking for users that have not been deleted', () => {
		UserQuery().notDeleted().query.should.have.property('deleted', {$ne: true});
	});
});