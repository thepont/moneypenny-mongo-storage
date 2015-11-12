var LocalUserQuery = require('../LocalUserQuery');
var QueryTests = require('auth-server/util/test/QueryTests')

describe('UserQuery()', () => {   
    QueryTests.itsAValidQueryObject(LocalUserQuery);
	it('Defaults to not showing hash', () =>{
		LocalUserQuery().projection.should.have.property('hash', 0);
	});
	
	describe('usernameEquals()', () => {
		var q = LocalUserQuery().usernameEquals('test'); 
		QueryTests.itHasCorrectProperties(q);
		it('Creates a query based on the username', () =>{
			q.query.should.have.property('username', 'test');
		});
	});
	
	describe('usernameEqualsIgnoreCase()', () => {
		var q = LocalUserQuery().usernameEqualsIgnoreCase('test'); 
		QueryTests.itHasCorrectProperties(q);
		it('Creates a query based on the username ignoring case', () =>{
			q.query.should.have.property('username');
			q.query.username.test('TeSt').should.be.true();
		});
	});
	describe('notDeleted()', () => {
		var q = LocalUserQuery().notDeleted(); 
		QueryTests.itHasCorrectProperties(q);
		it('Creates a query looking for users that have not been deleted', () => {
			q.query.should.have.property('deleted', {$ne: true});
		});
	})
	describe('showHash()', () => {
		var q = LocalUserQuery().showHash(); 
		QueryTests.itHasCorrectProperties(q);
		
		it('Creates a projection showing the password hash', () => {
			q.projection.should.have.property('hash', 1);
		});
	})

});