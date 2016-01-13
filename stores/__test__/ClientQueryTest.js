
var OAuth2ClientQuery = require('../ClientQuery');
var QueryTests = require('moneypenny-mongo-storage/util/test/QueryTests');

describe('ClientQuery()', () => {   
    QueryTests.itsAValidQueryObject(OAuth2ClientQuery);
    QueryTests.itCreatesIDQuery(OAuth2ClientQuery);
});