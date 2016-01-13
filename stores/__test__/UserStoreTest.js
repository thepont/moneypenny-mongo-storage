
var ObjectID = require('mongodb').ObjectID;
var sinon = require('sinon');
var proxyquire = require('proxyquire');
var should = require('should');

describe('UserStore()', () => {
    describe('save()', () => {
       it('saves a user in the database',(done) => {
            var save = sinon.stub().returns(Promise.resolve());
            var userDetails = {
                userId : new ObjectID()
            }            
            var userStore = proxyquire('../UserStore', {
                'moneypenny-mongo-storage/db/collection' : function(){
                    this.save = save;
                }
            })();
            userStore.save(userDetails).then(()=>{
                    try{
                        save.calledWithMatch(userDetails).should.be.true();
                        done();
                    } catch (ex){
                        done(ex);
                    }
            }).catch((ex)=>{
                    done(ex);
            });
       });  
       it('returns result from the collection', (done) => {
            var userDetails = {
                userId : new ObjectID()
            }     
            var userStore = proxyquire('../UserStore', {
                'moneypenny-mongo-storage/db/collection' : function(done){
                    this.save = (refreshToken) => Promise.resolve(refreshToken);
                }
            })();
            userStore.save(userDetails).then((ret)=>{
                    try{
                        ret.should.equal(userDetails);
                        done();
                    } catch (ex){
                        done(ex);
                    }
            }).catch((ex)=>{
                    done(ex);
            });
       });
    });
    describe('fetchById()', () => {
        it('fetches a user details by a userid, returns the promise from the collection',(done) =>{
            var userId = new ObjectID();
            var userDetails = {
                userId : userId
            }   
            var findOne = sinon.stub().returns(Promise.resolve(userDetails));
            var userStore = proxyquire('../UserStore', {
                'moneypenny-mongo-storage/db/collection' : function(){
                    this.findOne = findOne;
                }
            })();
            userStore.fetchById(userId).then((ret)=>{
                    try{
                        findOne.called.should.equal(true);
                        ret.should.equal(userDetails);
                        done();
                    } catch (ex){
                        done(ex);
                    }
            }).catch((ex)=>{
                    done(ex);
            });
       });
	   
	});
});