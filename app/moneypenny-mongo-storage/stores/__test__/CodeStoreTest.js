var ObjectID = require('mongodb').ObjectID;
var sinon = require('sinon');
var proxyquire = require('proxyquire');
var should = require('should');

describe('CodeStore()', () => {
    describe('save()', () => {
       it('saves a code in the database',(done) =>{
            var save = sinon.stub().returns(Promise.resolve());
            var codeDetails = {
                code : new ObjectID()
            }            
            var codeStore = proxyquire('../CodeStore', {
                'moneypenny-mongo-storage/db/collection' : function(){
                    this.save = save;
                }
            })();
            codeStore.save(codeDetails).then(()=>{
                    try{
                        save.calledWithMatch(codeDetails).should.be.true();
                        done();
                    } catch (ex){
                        done(ex);
                    }
            }).catch((ex)=>{
                    done(ex);
            });
       });  
       it('returns result from the collection', (done) => {
            var codeDetails = {
                codeDetails : new ObjectID()
            }            
            var codeStore = proxyquire('../CodeStore', {
                'moneypenny-mongo-storage/db/collection' : function(){
                    this.save = (codeDetails) => Promise.resolve(codeDetails);
                }
            })();
            codeStore.save(codeDetails).then((ret)=>{
                    try{
                        ret.should.equal(codeDetails);
                        done();
                    } catch (ex){
                        done(ex);
                    }
            }).catch((ex)=>{
                    done(ex);
            });
       });
    });
    describe('fetchByCode()', () => {
        it('fetches a code details by a code, returns the promise from the collection',(done) =>{
            var code = new ObjectID();
            var codeDetails = {
                code : code
            }
            var findOne = sinon.stub().returns(Promise.resolve(codeDetails));
            var codeStore = proxyquire('../CodeStore', {
                'moneypenny-mongo-storage/db/collection' : function(){
                    this.findOne = findOne;
                }
            })();
            codeStore.fetchByCode(code).then((ret)=>{
                    try{
                        findOne.called.should.equal(true);
                        ret.should.equal(codeDetails);
                        done();
                    } catch (ex){
                        done(ex);
                    }
            }).catch((ex)=>{
                    done(ex);
            });
       });
	   
	});
	   
	describe('removeByCode()', () => {
        it('Removes codedetails from collection based on code ',(done) =>{
            var code = new ObjectID();
            var remove = sinon.stub().returns(Promise.resolve({}));
            var codeStore = proxyquire('../CodeStore', {
                'moneypenny-mongo-storage/db/collection' : function(){
                    this.remove = remove;
                }
            })();
            codeStore.removeByCode(code).then((ret)=>{
                    try{
						remove.called.should.equal(true);
                        done();
                    } catch (ex){
                        //done(ex);
                    }
            }).catch((ex)=>{
                    //done(ex);
            });
       });    
    });
});