var proxyquire = require('proxyquire');
var sinon = require('sinon');
var should = require('should');

const COLLECTION_SAVE_RETURN = Promise.resolve('save return');
const COLLECTION_FINDONE_RETURN = Promise.resolve('findOne return');

// var save = sinon.stub().returns(COLLECTION_SAVE_RETURN);
var findOne = sinon.stub().returns(COLLECTION_FINDONE_RETURN);

var oAuth2ClientStore = proxyquire('../oAuth2ClientStore', {
	'auth-server/services/collection' : sinon.stub().returns({
		findOne: findOne
	}),
	'../oAuth2ClientQuery' : sinon.stub().returns({
		idEquals : 	sinon.stub().returns({})
	})
});



describe('oAuth2ClientStore', () => {
	describe('getId()', () => {
		it('Returns client.id', ()=> {
			var clientId = 'test_client';
			var returned = oAuth2ClientStore.getId({id:clientId})
			returned.should.be.exactly(clientId);
		});
	});
	describe('getRedirectUri()', () => {
		it('Returns client.redirectUri', ()=> {
			var redirectUri = 'test_client';
			var returned = oAuth2ClientStore.getRedirectUri({redirectUri:redirectUri})
			returned.should.be.exactly(redirectUri);
		});
	});
	describe('fetchById()', () => {
		it('Callsback with the oAuth client on correct id', (done)=> {
			var oAuth2ClientStore = proxyquire('../oAuth2ClientStore', {
				'auth-server/services/collection' : sinon.stub().returns({
					findOne: sinon.stub().returns(Promise.resolve({
            			id: 'clientId',
            			redirectUri: 'redirectUri',
						secret: 'secret'
					}))
				})
			});
			oAuth2ClientStore.fetchById('clientId', (err, item)=>{
				try{
					should.not.exist(err);
					item.should.have.property('id', 'clientId');
					item.should.have.property('redirectUri', 'redirectUri');
					item.should.have.property('secret', 'secret');
					done();
				} catch(err){
					done(err);
				}
			});
		});
		it('Callsback with an error if unable to fetch client', ()=> {
			var oAuth2ClientStore = proxyquire('../oAuth2ClientStore', {
				'auth-server/services/collection' : sinon.stub().returns({
					findOne: sinon.stub().returns(Promise.reject({}))
				})
			});
			oAuth2ClientStore.fetchById('clientId', (err, item)=>{
				try{
					should.exist(err);
					return done();
				} catch(err){
					return done(err);
				}
			});
		});
	});
	
	describe('checkPassword', ()=>{
		it('Call callback with true if password matches hash',(done)=>{
			var PasswordCrypto = require('auth-server/util/PasswordCrypto');
			PasswordCrypto.createHash('test').then((hash)=>{
				oAuth2ClientStore.checkSecret({secret: hash},'test',(err, result)=>{
					try{
						should.not.exist(err);		
						result.should.equal(true);
						return done();
					} catch(err){
						return done(err);
					}
				});
			})
		});
		it('Call callback with false if password does not match hash',(done)=>{
			oAuth2ClientStore.checkSecret({secret: 'hash'},'hash',(err, result)=>{
					try{
						should.not.exist(err);		
						result.should.equal(false);
						return done();
					} catch(err){
						return done(err);
					}
			})
		});
	});

});