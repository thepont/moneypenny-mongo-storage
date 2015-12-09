
var OAuth2ClientQuery = require('../ClientQueryTest');
var QueryTests = require('moneypenny-server/util/test/QueryTests')

describe('ClientQueryTest()', () => {   
    QueryTests.itsAValidQueryObject(OAuth2ClientQuery);
    QueryTests.itCreatesIDQuery(OAuth2ClientQuery);
});