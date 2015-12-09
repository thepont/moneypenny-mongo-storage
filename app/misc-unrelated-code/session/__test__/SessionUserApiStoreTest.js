var proxyquire = require('proxyquire');
var sinon = require('sinon');
var should = require('should');

const COLLECTION_SAVE_RETURN = 'save return';
const COLLECTION_FINDONE_RETURN = 'findOne return';

var save = sinon.stub().returns(COLLECTION_SAVE_RETURN);
var findOne = sinon.stub().returns(COLLECTION_FINDONE_RETURN);

var SessonUserApiStore = proxyquire('../SessionUserApiStore', {
	'moneypenny-server/services/collection' : sinon.stub().returns({
		save: save,
		findOne: findOne
	}),
	'moneypenny-server/auth/session/SessionUserQuery' : sinon.stub().returns({
		idEquals : 	sinon.stub().returns({})
	})
});



describe('SessonUserApiStore', () => {
	describe('save()', () => {
		it('Calls on collection to save user in the database', ()=> {
			SessonUserApiStore.save({test:'test'});
			save.calledOnce.should.be.exactly(true);
		});
		it('Returns the result of the collection save()', ()=> {
			SessonUserApiStore.save({test:'test'}).should.equal(COLLECTION_SAVE_RETURN);
		});
		
	})
	describe('load()', () => {
		it('Calls on collection to load user from database', ()=> {
			SessonUserApiStore.load({test:'test'});
			findOne.calledOnce.should.be.exactly(true);
		});
		it('Returns the result of the collection findOne()', ()=> {
			SessonUserApiStore.load({test:'test'}).should.equal(COLLECTION_FINDONE_RETURN);
		});
	});
});