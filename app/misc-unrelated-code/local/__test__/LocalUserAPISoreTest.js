var proxyquire = require('proxyquire');
var sinon = require('sinon');
var should = require('should');
var PromiseTest = require('moneypenny-server/util/test/PromiseTest');

describe('LocalUserAPIStore', () => {
	describe('getUser()', ()=> {
		PromiseTest.itReturnsAPromise(require('../LocalUserAPIStore').getUser);
		it('Resolves with the user from the database', (done)=>{
			var localUserAPIStore = proxyquire('../LocalUserAPIStore',{
				'moneypenny-server/services/collection' : sinon.stub().returns({
					findOne: sinon.stub().returns(Promise.resolve('test'))
				})
			});
			localUserAPIStore.getUser().then((user)=>{
				user.should.equal('test');
				done();	
			});
		});
	});
	describe('getUserHash()', ()=> {
		PromiseTest.itReturnsAPromise(require('../LocalUserAPIStore').getUserHash);
		it('Gets the users hash from the database', (done)=>{
			var localUserAPIStore = proxyquire('../LocalUserAPIStore',{
				'moneypenny-server/services/collection' : sinon.stub().returns({
					findOne: sinon.stub().returns(Promise.resolve('test'))
				})
			});
			localUserAPIStore.getUser().then((user)=>{
				user.should.equal('test');
				done();	
			});
		});
	})
});