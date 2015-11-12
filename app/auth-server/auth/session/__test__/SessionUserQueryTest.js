var SessionUserQuery = require('../SessionUserQuery');
var QueryTests = require('auth-server/util/test/QueryTests')

describe('SessionUserQuery()', () => {   
    QueryTests.itsAValidQueryObject(SessionUserQuery);
	QueryTests.itCreatesIDQuery(SessionUserQuery);
});