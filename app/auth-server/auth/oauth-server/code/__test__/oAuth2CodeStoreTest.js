
var oAuthCodeStore = require('../oAuth2CodeStore');
var proxyquire = require('proxyquire');
var sinon = require('sinon');
var should = require('should');


describe('oAuthCodeStore', () => {   
	describe('getUserId()', () => {
		it('Returns User Id from Authe2Code object', () =>{
			oAuthCodeStore.getUserId({userId:'test'}).should.equal('test');
		});
	});
	
	describe('getClientId()', () => {
		it('Returns User Id from Authe2Code object', () =>{
			oAuthCodeStore.getClientId({clientId:'test'}).should.equal('test');
		});
	});
	
	describe('getScope()', () => {
		it('Returns scope of the Authe2Code object', () =>{
			oAuthCodeStore.getScope({scope:'test'}).should.equal('test');
		});
	});
	
	describe('create()', () => {
			it('Creates a new oAuth2 code with correct properties and saves in the DB', (done) =>{
				var collectionSave = sinon.stub().returns(Promise.resolve({}));
				var oAuthCodeStore = proxyquire('../oAuth2CodeStore', {
					'auth-server/services/collection' : sinon.stub().returns({
						save: collectionSave
					})
				});
				 
				oAuthCodeStore.create('userid', 'client', 'ALL', 10000, (error, saved)=>{
					try{
						collectionSave.args[0][0].should.have.property('userId', 'userid');
						collectionSave.args[0][0].should.have.property('clientId', 'client');						
						collectionSave.args[0][0].should.have.property('scope', 'ALL');
						collectionSave.args[0][0].should.have.property('ttl', 10000);
						done();
					} catch (err){
						done(err);
					}
				});
			});
			
		
		it('It calls back with a token', (done) => {
			var oAuthCodeStore = proxyquire('../oAuth2CodeStore', {
				'auth-server/services/collection' : sinon.stub().returns({
					save: sinon.stub().returns(Promise.resolve({}))
				})
			});
			oAuthCodeStore.create('userid', 'client', 'ALL', 10000, (error, saved)=>{
				try{
					saved.should.be.type('string');
					done();
				} catch (err){
					done(err);
				}
			});
		});
		
		it('Calls callback with error if an error occurs', (done) =>{
			var oAuthCodeStore = proxyquire('../oAuth2CodeStore', {
				'auth-server/services/collection' : sinon.stub().returns({
					save: sinon.stub().returns(Promise.reject({}))
				})
			});
			oAuthCodeStore.create('userid', 'client', 'ALL', 10000, (error, saved)=>{
				try{
					should.exist(error);
					done();
				} catch (err){
					done(err);
				}
			});
		});
	});
	
	describe('fetchByCode()', () => {
		it('Returns oAuth code details from database if found', (done) =>{
			var oAuthCodeStore = proxyquire('../oAuth2CodeStore', {
				'auth-server/services/collection' : sinon.stub().returns({
					findOne: sinon.stub().returns(Promise.resolve({
						userId: 'userId',
            			clientId: 'clientId',
            			scope: 'scope',
            			ttl: 'ttl'
					}))
				})
			});
			oAuthCodeStore.fetchByCode('testcode', (err, item)=>{
				try{
					item.should.have.property('userId', 'userId');
					item.should.have.property('clientId', 'clientId');
					item.should.have.property('scope', 'scope');
					item.should.have.property('ttl', 'ttl');
					done();
				} catch (err){
					done(err);
				}
			});
			
		});
		
		it('Calls callback with error if an error occurs', (done) =>{
			var oAuthCodeStore = proxyquire('../oAuth2CodeStore', {
				'auth-server/services/collection' : sinon.stub().returns({
					findOne: sinon.stub().returns(Promise.reject({}))
				})
			});
			oAuthCodeStore.fetchByCode('testcode', (error, saved)=>{
				try{
					should.exist(error);
					done();
				} catch (err){
					done(err);
				}
			});
		});
	});
	
	describe('removeByCode()', () => {
		var collectionRemove = sinon.stub().returns(Promise.resolve({}));
		it('Removes oAuth token whos code matches code', () =>{
			var oAuthCodeStore = proxyquire('../oAuth2CodeStore', {
				'auth-server/services/collection' : sinon.stub().returns({
					remove: collectionRemove
				})
			});
			oAuthCodeStore.removeByCode('code', (error, saved)=>{
				try{
					collectionRemove.called.should.be.true;
					should.not.exist(error);
					done();
				} catch (err){
					done(err);
				}
			});
		});
		
		it('Calls callback with error if an error occurs', () =>{
			var oAuthCodeStore = proxyquire('../oAuth2CodeStore', {
				'auth-server/services/collection' : sinon.stub().returns({
					remove: sinon.stub().returns(Promise.reject())
				})
			});
			oAuthCodeStore.removeByCode('code', (error, saved)=>{
				try{
					should.exist(error);
					done();
				} catch (err){
					done(err);
				}
			});
		});
	});
	
	describe('checkTTL', ()=>{
		it('Returns true if the token is still valid', (done)=> {
				var oAuthCodeStore = proxyquire('../oAuth2CodeStore', {
					'auth-server/services/collection' : sinon.stub().returns({
						save: sinon.stub().returns(Promise.resolve())
					})
				});
				oAuthCodeStore.create('userId', 'clinetId', 'scope', 10000000, (err, code) => {
					try{
						oAuthCodeStore.checkTTL({code : code}).should.equal(true);
						done();
					} catch (err){
						done(err);
					}
				})
		}),
		it('Returns false if the token is no longer valid', ()=>{
				var oAuthCodeStore = proxyquire('../oAuth2CodeStore', {
					'auth-server/services/collection' : sinon.stub().returns({
						save: sinon.stub().returns(Promise.resolve())
					})
				});
				oAuthCodeStore.create('userId', 'clinetId', 'scope', -1, (err, code) => {
					try{
						oAuthCodeStore.checkTTL({ code : code}).should.equal(false);
						done(); 
					} catch (err){
						done(err);
					}
				})
		});
	});
});
