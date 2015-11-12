var should = require('should');

export function itReturnsAPromise(func) {
    return it('should return a promsie', () => {
        func().should.have.property('then');
    });
}

export function shouldThrowError(func){
    var args = Array.slice(arguments).slice(1);
    func.apply(this, args).then((result)=>{
            return Promise.reject();
        }).catch(function(err){
            return should.exist(err);
        });
}