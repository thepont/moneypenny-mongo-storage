var should = require('should');
var OAuth2ClientQuery = require('../oAuth2ClientQuery');


itsAValidQueryObject = function(query){
    var queryInstance = query(); 
    it('Has .query property', () => {
        queryInstance.should.have.property('query');
    });
    it('Has projection property', () => {
        queryInstance.should.have.property('projection');
    });
}

describe('oAuth2ClientQuery()', () => {
    //Move into default query tester.
    it('Has .query property', () => {
        
    });
});
