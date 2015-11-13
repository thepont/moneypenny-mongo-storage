var {ObjectID} = require('mongodb');
var should = require('should');
var proxyquire = require('proxyquire');
var sinon = require('sinon');

describe('oAuth2RequestTokenMongoStore', () => {
	describe('getUserId()', () => {
		it('Gets the userId from the refresh token object', () =>{
			var refreshToken = {
				userId : new ObjectID()
			};
			var oAuth2RefreshTokenMongoStore = require('../oAuth2RefreshTokenMongoStore');
			var userId = oAuth2RefreshTokenMongoStore.getUserId(refreshToken);
			userId.should.equal(refreshToken.userId);
		});
	});
	
	describe('getClientId()', () => {
		it('Gets the clientId from the refresh token object', () =>{
			var refreshToken = {
				clientId : new ObjectID()
			};
			var oAuth2RefreshTokenMongoStore = require('../oAuth2RefreshTokenMongoStore');
			var clientId = oAuth2RefreshTokenMongoStore.getClientId(refreshToken);
			clientId.should.equal(refreshToken.clientId);
		});
	});
	
	describe('getScope()', () => {
		it('Gets the clientId from the refresh token object', () =>{
			var refreshToken = {
				scope : new ObjectID()
			};
			var oAuth2RefreshTokenMongoStore = require('../oAuth2RefreshTokenMongoStore');
			var scope = oAuth2RefreshTokenMongoStore.getScope(refreshToken);
			scope.should.equal(refreshToken.scope);
		});
	});
	
	describe('create()', () => {
		it('Creates a token then calls back with the token', (done) =>{
			var oAuth2RefreshTokenMongoStore = proxyquire('../oAuth2RefreshTokenMongoStore', {
				'auth-server/services/collection' : () => { 
					return {
						save: () => Promise.resolve({})
					}
				},
				'crypto' : {
					randomBytes : () => '12345'
				}
			});
			oAuth2RefreshTokenMongoStore.create('userid','clientid','scope', (err, token) => {
				try{
					should.not.exist(err);
					token.should.equal('12345');
					done();
				} catch (err){
					done(err);
				}
			})
		});
		it('Calls back with an error if an error occours saving to db', (done) =>{
			var oAuth2RefreshTokenMongoStore = proxyquire('../oAuth2RefreshTokenMongoStore', {
				'auth-server/services/collection' : sinon.stub().returns({
					save: sinon.stub().returns(Promise.reject({}))
				}),
			});
			oAuth2RefreshTokenMongoStore.create('userid','clientid','scope', (err, token) => {
				try{
					should.exist(err);
					done();
				} catch (err){
					done(err);
				}
			})
		});	
	});
	describe('fetchByToken()', () => {
		it('Returns the token found in the database', (done) =>{
			var token = {
				token: '1234',
				userId: 'jsmith'
			}
			var oAuth2RefreshTokenMongoStore = proxyquire('../oAuth2RefreshTokenMongoStore', {
				'auth-server/services/collection' : () => {
					return {
						findOne: () =>  Promise.resolve(token)
					}
				}
			});
			oAuth2RefreshTokenMongoStore.fetchByToken('token', (err, token) => {
				try{
					should.not.exist(err);
					token.should.equal(token);
					done();
				} catch (err){
					done(err);
				}
			})
		});
		
		it('Returns an error on a database error', (done) =>{
			var oAuth2RefreshTokenMongoStore = proxyquire('../oAuth2RefreshTokenMongoStore', {
				'auth-server/services/collection' : () => {
					return {
						findOne: () =>  Promise.reject('err')
					}
				}
			});
			oAuth2RefreshTokenMongoStore.fetchByToken('token', (err, token) => {
				try{
					should.exist(err);
					done();
				} catch (err){
					done(err);
				}
			});
		});
	});
	describe('removeByUserIdClientId()', () => {
		it('Returns no error on success', (done) =>{
			var oAuth2RefreshTokenMongoStore = proxyquire('../oAuth2RefreshTokenMongoStore', {
				'auth-server/services/collection' : () => {
					return {
						remove: () =>  Promise.resolve({})
					}
				}
			});
			oAuth2RefreshTokenMongoStore.removeByUserIdClientId('userId', 'clientid', (err) => {
				try{
					should.not.exist(err);
					done();
				} catch (err){
					done(err);
				}
			})
		});
		
		it('Returns an error on fail', (done) =>{
			var oAuth2RefreshTokenMongoStore = proxyquire('../oAuth2RefreshTokenMongoStore', {
				'auth-server/services/collection' : () => {
					return {
						remove: () =>  Promise.reject({})
					}
				}
			});
			oAuth2RefreshTokenMongoStore.removeByUserIdClientId('userId', 'clientid', (err) => {
				try{
					should.exist(err);
					done();
				} catch (err){
					done(err);
				}
			})
		})
	});
	describe('removeByRefreshToken()', () => {
		it('Returns no error on success', (done) =>{
			var oAuth2RefreshTokenMongoStore = proxyquire('../oAuth2RefreshTokenMongoStore', {
				'auth-server/services/collection' : () => {
					return {
						remove: () =>  Promise.resolve({})
					}
				}
			});
			oAuth2RefreshTokenMongoStore.removeByRefreshToken('token', (err) => {
				try{
					should.not.exist(err);
					done();
				} catch (err){
					done(err);
				}
			})
		});
		
		it('Returns an error on fail', (done) =>{
			var oAuth2RefreshTokenMongoStore = proxyquire('../oAuth2RefreshTokenMongoStore', {
				'auth-server/services/collection' : () => {
					return {
						remove: () =>  Promise.reject({})
					}
				}
			});
			oAuth2RefreshTokenMongoStore.removeByRefreshToken('token', (err) => {
				try{
					should.exist(err);
					done();
				} catch (err){
					done(err);
				}
			})
		})
	});
}); 