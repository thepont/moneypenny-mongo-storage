var should = require('should');
module.exports ={ 
    itReturnsAPromise : function(func){
        return it('should return a promsie', () => {
            func().should.have.property('then');
        });
    }, 
    shouldThrowError :  function(func) {
        var args = Array.prototype.slice.call(arguments).slice(1);
        func.apply(this, args).then((result)=>{
                return Promise.reject();
            }).catch(function(err){
                return should.exist(err);
            });
    }
}