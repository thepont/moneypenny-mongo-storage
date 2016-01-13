
var ClientStore = require('../ClientStore');
var ObjectID = require('mongodb').ObjectID;
var sinon = require('sinon');
var proxyquire = require('proxyquire');

describe('ClientStore()',() => {
    describe('createClient()', () => {
       it('saves client in the database',(done) =>{
            var save = sinon.stub().returns(Promise.resolve());
            var client = {
                _id : new ObjectID()
            }            
            var clientStore = proxyquire('../ClientStore', {
                'moneypenny-mongo-storage/db/collection' : function(){
                    this.save = save;
                }
            })();
            clientStore.createClient(client).then(()=>{
                    try{
                        save.calledWithMatch(client).should.be.true();
                        done();
                    } catch (ex){
                        done(ex);
                    }
            }).catch((ex)=>{
                    done(ex);
            });
       });  
       it('returns result from the collection', (done) => {
            var client = {
                _id : new ObjectID()
            }            
            var clientStore = proxyquire('../ClientStore', {
                'moneypenny-mongo-storage/db/collection' : function(){
                    this.save = (clientToSave) => Promise.resolve(clientToSave);
                }
            })();
            clientStore.createClient(client).then((ret)=>{
                    try{
                        ret.should.equal(client);
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
        it('fetches a client by an ID, returns the promise from the collection',(done) =>{
            var id = new ObjectID();
            var client = {
                _id : id
            }
            var findOne = sinon.stub().returns(Promise.resolve(client));
            var clientStore = proxyquire('../ClientStore', {
                'moneypenny-mongo-storage/db/collection' : function(){
                    this.findOne = findOne;
                }
            })();
            clientStore.fetchById(id).then((ret)=>{
                    try{
                        ret.should.equal(client);
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