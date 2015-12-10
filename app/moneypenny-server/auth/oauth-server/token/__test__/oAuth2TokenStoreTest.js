
var oAuth2TokenStore = require('../oAuth2TokenStore');
var proxyquire = require('proxyquire');
var sinon = require('sinon');
var should = require('should');
var {ObjectID} = require('mongodb');

describe('oAuth2TokenStore', () => {   
	describe('getToken()', () => {
		it('Gets the token from the oAuth2Token object', () =>{
			oAuth2TokenStore.getToken({token:'test'}).should.equal('test');
		});
	});
	
	describe('create()', () => {
		it('Creates a new oAuth2 code.', (done) =>{
			var collectionSave = sinon.stub().returns(Promise.resolve({}));
			var userId = new ObjectID();
			var oAuth2TokenStore = proxyquire('../oAuth2TokenStore', {
				'auth-server/services/collection' : sinon.stub().returns({
					save: collectionSave
				}),
				'auth-server/auth/session/SessionUserApiStore' : {
					load : sinon.stub().returns(
						Promise.resolve({userName:'test'})
					)
				}
			});
			
			oAuth2TokenStore.create(userId, 'client', 'ALL', 10000, (err, accessToken)=>{
				try{
					collectionSave.args[0][0].should.have.property('userId', userId);
					collectionSave.args[0][0].should.have.property('clientId', 'client');						
					collectionSave.args[0][0].should.have.property('scope', 'ALL');
					done();
				}catch (err){
					done(err);
				}
			});
		});
		
		it('Calls callback with error if an error occours while loading the user', (done) =>{
			var collectionSave = sinon.stub().returns(Promise.resolve({}));
			var userId = new ObjectID();
			var oAuth2TokenStore = proxyquire('../oAuth2TokenStore', {
				'auth-server/services/collection' : sinon.stub().returns({
					save: collectionSave
				}),
				'auth-server/auth/session/SessionUserApiStore' : {
					load : sinon.stub().returns(
						Promise.reject('')
					)
				}
			});
			
			oAuth2TokenStore.create(userId, 'client', 'ALL', 10000, (err, accessToken)=>{
				try{
					should.exist(err);
					done();
				}catch (err){
					done(err);
				}
			});
		});
		
		it('Calls callback with error if an error occurs while saving the token', (done) =>{
			var userId = new ObjectID();
			var oAuth2TokenStore = proxyquire('../oAuth2TokenStore', {
				'auth-server/services/collection' : sinon.stub().returns({
					save: sinon.stub().returns(Promise.reject({}))
				}),
				'auth-server/auth/session/SessionUserApiStore' : {
					load : sinon.stub().returns(
						Promise.resolve({userName:'test'})
					)
				}
			});
			
			oAuth2TokenStore.create(userId, 'client', 'ALL', 10000, (err, accessToken)=>{
				try{
					should.exist(err);
					done();
				}catch (err){
					done(err);
				}
			});
		});
		
	});
	
	describe('fetchByToken()', () => {
		it('Returns oAuth token from database if found', () =>{
			var oAuth2TokenStore = proxyquire('../oAuth2TokenStore', {
				'auth-server/services/collection' : sinon.stub().returns({
					findOne: sinon.stub().returns(Promise.resolve({
						userId: 'userId',
            			clientId: 'clientId',
            			scope: 'scope',
						token: 'token'
					}))
				})
			});
			oAuth2TokenStore.fetchByToken('testcode', (err, item)=>{
				try{
					item.should.have.property('userId', 'userId');
					item.should.have.property('clientId', 'clientId');
					item.should.have.property('scope', 'scope');
					item.should.have.property('token', 'token');
					done();
				} catch (err){
					done(err);
				}
			});
			
		});
		
		it('Calls callback with error if an error occours', () =>{
			var oAuth2TokenStore = proxyquire('../oAuth2TokenStore', {
				'auth-server/services/collection' : sinon.stub().returns({
					findOne: sinon.stub().returns(Promise.reject({}))
				})
			});
			oAuth2TokenStore.fetchByToken('testcode', (error, saved)=>{
				try{
					should.exist(error);
					done();
				} catch (err){
					done(err);
				}
			});
		});
	});
	
	describe('checkTTL()', () => {
		it('Returns true if the token is still valid', (done)=> {
			var oAuth2TokenStore = proxyquire('../oAuth2TokenStore', {
				'auth-server/services/collection' : sinon.stub().returns({
					save: sinon.stub().returns(Promise.resolve())
				}),
				'auth-server/auth/session/SessionUserApiStore' : {
					load : sinon.stub().returns(
						Promise.resolve({userName:'test'})
					)
				}
			});
			oAuth2TokenStore.create(new ObjectID(), 'client', 'ALL', 10000, (err, token)=>{
				try{
					oAuth2TokenStore.checkTTL({token : token}).should.equal(true);
					done();
				} catch (err){
					done(err);
				}
			});
		});
		it('Returns false if the token is no longer valid', (done)=> {
			var oAuth2TokenStore = proxyquire('../oAuth2TokenStore', {
				'auth-server/services/collection' : sinon.stub().returns({
					save: sinon.stub().returns(Promise.resolve())
				}),
				'auth-server/auth/session/SessionUserApiStore' : {
					load : sinon.stub().returns(
						Promise.resolve({userName:'test'})
					)
				}
			});
			
			oAuth2TokenStore.create(new ObjectID(), 'client', 'ALL', -10000, (err, token)=>{
				try{
					oAuth2TokenStore.checkTTL({token : token}).should.equal(false);
					done();
				} catch (err){
					done(err);
				}
			});
			
		});
		
	});
	
	describe('getTTL()', () => {
		it('Get the current TTL', () =>{
			var ttl = 10000;
			var currentTtl = oAuth2TokenStore.getTTL({expiresAt:  new Date((new Date()).getTime() + ttl)});
			currentTtl.should.be.approximately(10000, 30);
		});
	});
	
	describe('fetchByUserIdClientId()', () => {
		it('Fetch the token by user and clientid', (done) =>{
			var oAuth2TokenStore = proxyquire('../oAuth2TokenStore', {
				'auth-server/services/collection' : sinon.stub().returns({
					findOne: sinon.stub().returns(Promise.resolve({
						'test':'test'
					}))
				})
			});
				
			oAuth2TokenStore.fetchByUserIdClientId(new ObjectID(), 'test', (err, token)=>{
				try{
					should.not.exist(err);
					token.should.have.property('test', 'test');
					done();
				} catch (err){
					done(err);
				}
			});
		});
		
		it('Returns an error if it fails to fetch the token', (done) =>{
			var oAuth2TokenStore = proxyquire('../oAuth2TokenStore', {
				'auth-server/services/collection' : sinon.stub().returns({
					findOne: sinon.stub().returns(Promise.reject({}))
				})
			});
				
			oAuth2TokenStore.fetchByUserIdClientId(new ObjectID(), 'test', (err, token)=>{
				try{
					should.exist(err);
					done();
				} catch (err){
					done(err);
				}
			});
		});
	});
});
