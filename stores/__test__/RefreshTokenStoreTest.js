var ObjectID = require('mongodb').ObjectID;
var sinon = require('sinon');
var proxyquire = require('proxyquire');
var should = require('should');

describe('RefreshTokenStore()', () => {
    describe('save()', () => {
       it('saves a code in the database',(done) => {
            var save = sinon.stub().returns(Promise.resolve());
            var refreshToken = {
                token : new ObjectID()
            }            
            var refreshTokenStore = proxyquire('../RefreshTokenStore', {
                'moneypenny-mongo-storage/db/collection' : function(){
                    this.save = save;
                }
            })();
            refreshTokenStore.save(refreshToken).then(()=>{
                    try{
                        save.calledWithMatch(refreshToken).should.be.true();
                        done();
                    } catch (ex){
                        done(ex);
                    }
            }).catch((ex)=>{
                    done(ex);
            });
       });  
       it('returns result from the collection', () => {
            var refreshToken = {
                token : new ObjectID()
            }            
            var refreshTokenStore = proxyquire('../RefreshTokenStore', {
                'moneypenny-mongo-storage/db/collection' : function(done){
                    this.save = (refreshToken) => Promise.resolve(refreshToken);
                }
            })();
            refreshTokenStore.save(refreshToken).then((ret)=>{
                    try{
                        ret.should.equal(refreshToken);
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
            var refreshTokenStore = proxyquire('../RefreshTokenStore', {
                'moneypenny-mongo-storage/db/collection' : function(){
                    this.findOne = findOne;
                }
            })();
            refreshTokenStore.fetchByToken(token).then((ret)=>{
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
	   
	describe('removeByUserIdClientId()', () => {
        it('Removes codedetails from collection based on code ',(done) =>{
            var clientId = 'testClientId';
            var userId = 'testUserId';
            var code = new ObjectID();
            var remove = sinon.stub().returns(Promise.resolve({}));
            var refreshTokenStore = proxyquire('../RefreshTokenStore', {
                'moneypenny-mongo-storage/db/collection' : function(){
                    this.remove = remove;
                }
            })();
            refreshTokenStore.removeByUserIdClientId(userId, clientId).then((ret)=>{
                    try{
                        remove.called.should.equal(true);
                        done();
                    } catch (ex){
                        done(ex);
                    }
            }).catch((ex)=>{
                    done(ex);
            });
       });
	});
	describe('removeByRefreshToken()', () => {
        it('Removes codedetails from collection based on code ',(done) =>{
            var token = new ObjectID();
            var remove = sinon.stub().returns(Promise.resolve({}));
            var refreshTokenStore = proxyquire('../RefreshTokenStore', {
                'moneypenny-mongo-storage/db/collection' : function(){
                    this.remove = remove;
                }
            })();
            refreshTokenStore.removeByRefreshToken(token).then((ret)=>{
                    try{
						remove.called.should.equal(true);
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