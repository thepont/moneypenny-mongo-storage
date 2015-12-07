
var OAuth2ClientQuery = require('../ClientQueryTest');
var QueryTests = require('auth-server/util/test/QueryTests')

describe('ClientQueryTest()', () => {   
    QueryTests.itsAValidQueryObject(OAuth2ClientQuery);
    QueryTests.itCreatesIDQuery(OAuth2ClientQuery);
});