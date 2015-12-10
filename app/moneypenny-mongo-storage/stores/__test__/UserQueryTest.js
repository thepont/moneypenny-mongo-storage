var UserQuery = require('../UserQuery');
var QueryTests = require('moneypenny-mongo-storage/util/test/QueryTests');

describe('UserQuery()', () => {   
    QueryTests.itsAValidQueryObject(UserQuery);
	QueryTests.itCreatesIDQuery(UserQuery);
});