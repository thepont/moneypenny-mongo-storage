
var ObjectID = require('mongodb').ObjectID;
var sinon = require('sinon');
var proxyquire = require('proxyquire');
var should = require('should');

describe('RefreshTokenStore()', () => {
    describe('save()', () => {
       it('saves a code in the database',(done) => {
            var save = sinon.stub().returns(Promise.resolve());
            var tokenDetails = {
                token : new ObjectID()
            }            
            var tokenStore = proxyquire('../TokenStore', {
                'moneypenny-mongo-storage/db/collection' : function(){
                    this.save = save;
                }
            })();
            tokenStore.save(tokenDetails).then(()=>{
                    try{
                        save.calledWithMatch(tokenDetails).should.be.true();
                        done();
                    } catch (ex){
                        done(ex);
                    }
            }).catch((ex)=>{
                    done(ex);
            });
       });  
       it('returns result from the collection', (done) => {
            var tokenDetails = {
                token : new ObjectID()
            }            
            var tokenStore = proxyquire('../TokenStore', {
                'moneypenny-mongo-storage/db/collection' : function(done){
                    this.save = (refreshToken) => Promise.resolve(refreshToken);
                }
            })();
            tokenStore.save(tokenDetails).then((ret)=>{
                    try{
                        ret.should.equal(tokenDetails);
                        done();
                    } catch (ex){
                        done(ex);
                    }
            }).catch((ex)=>{
                    done(ex);
            });
       });
    });
    describe('fetchByToken()', () => {
        it('fetches a code details by a code, returns the promise from the collection',(done) =>{
            var token = new ObjectID();
            var tokenDetails = {
                token : token
            }
            var findOne = sinon.stub().returns(Promise.resolve(tokenDetails));
            var tokenStore = proxyquire('../TokenStore', {
                'moneypenny-mongo-storage/db/collection' : function(){
                    this.findOne = findOne;
                }
            })();
            tokenStore.fetchByToken(token).then((ret)=>{
                    try{
                        findOne.called.should.equal(true);
                        ret.should.equal(tokenDetails);
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