var UserQuery = require('../UserQuery');
var QueryTests = require('moneypenny-server/util/test/QueryTests')

describe('UserQuery()', () => {   
    QueryTests.itsAValidQueryObject(SessionUserQuery);
	QueryTests.itCreatesIDQuery(SessionUserQuery);
});