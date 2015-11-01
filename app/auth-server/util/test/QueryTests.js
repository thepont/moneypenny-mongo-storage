var should = require('should');
module.exports = {
    itsAValidQueryObject: function(query){
        var queryInstance = query(); 
        it('Has .query property', () => {
            queryInstance.should.have.property('query');
        });
        it('Has .projection property', () => {
            queryInstance.should.have.property('projection');
        });
    },
    itCreatesIDQuery: function(query){
        var queryInstance = query(); 
        it('Querys on id', () => {
            queryInstance.idEquals('test').query.should.have.property('_id', 'test'); 
        });   
    }
}