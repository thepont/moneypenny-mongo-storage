var should = require('should');
var proxyquire = require('proxyquire');
var {ObjectID} = require('mongodb');
describe('oAuth2UserStore', () => {
	describe('fetchFromRequest()', () => {
		it('Returns the user from the express request', () =>{
			var user = {
				_id: 'smiddy',
				username: 'test'
			}
			var req = {
				user : user
			}
			var oAuth2UserStore = require('../oAuth2UserStore');
			var ret = oAuth2UserStore.fetchFromRequest(req);
			ret.should.equal(user);
		});
	});
	
	describe('getId()', () => {
		it('Returns the id from the user object', () =>{
			var user = {
				_id: new ObjectID(),
				username: 'test'
			}
			var oAuth2UserStore = require('../oAuth2UserStore');
			var ret = oAuth2UserStore.getId(user);
			ret.should.equal(user._id);
		});
	});
	
	describe('fetchById()', () => {
		it('Returns the user from the session', (done) =>{
			var user = {
				_id: new ObjectID(),
				username: 'test'
			}
			
			var oAuth2UserStore = proxyquire('../oAuth2UserStore', {
				'moneypenny-server/auth/session/SessionUserApiStore' : {
					load: () => Promise.resolve(user)
				}
			});
			
			var ret = oAuth2UserStore.fetchById(user._id, (err, ret) => {
				try {
					should.not.exist(err);
					ret.should.equal(user);
					done();
				} catch (err) {
					done(err);
				}
			});
		});
		
		it('Returns an error on a db error', (done) =>{
			var oAuth2UserStore = proxyquire('../oAuth2UserStore', {
				'moneypenny-server/auth/session/SessionUserApiStore' : {
					load: () =>  Promise.reject('err')
				}
			});
			var ret = oAuth2UserStore.fetchById(new ObjectID(), (err, user) => {
				try {
					should.exist(err);
					done();
				} catch (err) {
					done(err);
				}
			});
		});
	});
	
});