
var OAuth2ClientQuery = require('../oAuth2ClientQuery');
var QueryTests = require('auth-server/util/test/QueryTests')

describe('oAuth2ClientQuery()', () => {   
    QueryTests.itsAValidQueryObject(OAuth2ClientQuery);
    QueryTests.itCreatesIDQuery(OAuth2ClientQuery);
});