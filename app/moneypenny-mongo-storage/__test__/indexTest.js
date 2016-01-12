var ObjectID = require('mongodb').ObjectID;
var sinon = require('sinon');
var proxyquire = require('proxyquire');

var moneypennyMongoStore = require('../index')({db : {
	collection : () => {} 
}});

describe('index', () => {
	it('throws an error if no db is passed', (done) => {
		try {
			require('../index')();
			done('expected an error');
		} catch (ex){
			done();
		}
	});
	
	it('Exposes userStore',() =>{
		moneypennyMongoStore.userStore.should.be.type('object');
		moneypennyMongoStore.userStore.save.should.be.type('function');
		moneypennyMongoStore.userStore.fetchById.should.be.type('function');
	});
	
	it('Exposes clientStore',() =>{
		moneypennyMongoStore.clientStore.should.be.type('object');
		moneypennyMongoStore.clientStore.createClient.should.be.type('function');
		moneypennyMongoStore.clientStore.fetchById.should.be.type('function');
	});	
	it('Exposes codeStore',() =>{
		moneypennyMongoStore.codeStore.should.be.type('object');
		moneypennyMongoStore.codeStore.save.should.be.type('function');
		moneypennyMongoStore.codeStore.fetchByCode.should.be.type('function');
		moneypennyMongoStore.codeStore.removeByCode.should.be.type('function');
	});
	it('Exposes refreshTokenStore',() =>{
		moneypennyMongoStore.refreshTokenStore.should.be.type('object');
		moneypennyMongoStore.refreshTokenStore.save.should.be.type('function');
		moneypennyMongoStore.refreshTokenStore.removeByUserIdClientId.should.be.type('function');
		moneypennyMongoStore.refreshTokenStore.fetchByToken.should.be.type('function');
		moneypennyMongoStore.refreshTokenStore.removeByRefreshToken.should.be.type('function');
	});
	
	it('Exposes tokenStore',() =>{
		moneypennyMongoStore.tokenStore.should.be.type('object');
		moneypennyMongoStore.tokenStore.save.should.be.type('function');
		moneypennyMongoStore.tokenStore.fetchByToken.should.be.type('function');
		moneypennyMongoStore.tokenStore.fetchByUserIdClientId.should.be.type('function');
	});
	it('Exposes userStore',() =>{
		moneypennyMongoStore.userStore.should.be.type('object');
		moneypennyMongoStore.userStore.save.should.be.type('function');
		moneypennyMongoStore.userStore.fetchById.should.be.type('function');
	});
});