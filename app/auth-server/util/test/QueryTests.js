var should = require('should');
var ObjectID = require('mongodb').ObjectID;
module.exports = {
    itsAValidQueryObject: function(query){
        var queryInstance = query();
        this.itHasCorrectProperties(queryInstance);
    },
    itHasCorrectProperties(queryInstance){
        it('returns an object with .query property', () => {
            queryInstance.should.have.property('query');
        });
        it('returns an object with .projection property', () => {
            queryInstance.should.have.property('projection');
        });
    },
    itCreatesIDQuery: function(query){
        var queryInstance = query(); 
        describe('idEquals()', () => {
            var objectid = new ObjectID();
            var q = queryInstance.idEquals(objectid);
            this.itHasCorrectProperties(q);
            it('Querys on id', () => {               
                q.query.should.have.property('_id', objectid); 
            });   
        });   
    }
}