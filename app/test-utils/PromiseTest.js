var should = require('should');
module.exports ={ 
    itReturnsAPromise : (func) => {
        return it('should return a promsie', () => {
            func().should.have.property('then');
        });
    }, 
    shouldThrowError : (func) => {
        var args = Array.slice(arguments).slice(1);
        func.apply(this, args).then((result)=>{
                return Promise.reject();
            }).catch(function(err){
                return should.exist(err);
            });
    }
}