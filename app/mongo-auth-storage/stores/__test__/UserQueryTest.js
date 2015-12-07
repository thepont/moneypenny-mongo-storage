var UserQuery = require('../UserQuery');
var QueryTests = require('auth-server/util/test/QueryTests')

describe('UserQuery()', () => {   
    QueryTests.itsAValidQueryObject(SessionUserQuery);
	QueryTests.itCreatesIDQuery(SessionUserQuery);
});