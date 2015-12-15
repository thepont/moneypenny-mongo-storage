var should = require('should');
var ObjectID = require('mongodb').ObjectID;

module.exports = {
    itsAValidQueryObject: function(query){
        var queryInstance = query();
        this.itHasCorrectProperties(queryInstance);
    },
    itHasCorrectProperties: function(queryInstance){
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
            var q = queryInstance.idEquals(objectid.toHexString());
            this.itHasCorrectProperties(q);
            it('Querys on id', () => {
                var returnId = typeof q.query._id === 'object' ? q.query._id.toHexString() : q.query._id;
                //var returnId = ObjectID(q.query._id);
                returnId.should.equal(objectid.toHexString());
            });   
        });   
    }
}