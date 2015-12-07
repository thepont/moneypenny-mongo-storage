var proxyquire = require('proxyquire');
var sinon = require('sinon');
var should = require('should');

describe('MongoLocalStrategy', () => {   
	describe('autenticate', () => {   
		it('It returns an error if the username does not exist', () =>{
			
		});
		it('It returns an error if the password is incorrect', () =>{
			var mongoLocalStrategy = proxyquire('../MongoLocalStrategy',{
				'auth-server/auth/local/LocalUserAPIStore' : {
					getUserHash: sinon.stub().returns(Promise.resolve({}))
				},
				'passport-local' : {
					Strategy : function(authenticate){
						this.authenticate = authenticate;
					}
				},
				'auth-server/util/PasswordCrypto' : {
					
				}
			});
			
			mongoLocalStrategy.authenticate('user', 'password', (err, user, message) => {
				try {
					user.should.be.false();
					should.exist(message);
					should.not.exist(err);
					done();
				}
				catch(err){
					done(err);
				}
			});
		});
		it('It returns an error if it fails to get the password hash', (done) =>{
			var mongoLocalStrategy = proxyquire('../MongoLocalStrategy',{
				'auth-server/auth/local/LocalUserAPIStore' : {
					getUserHash: sinon.stub().returns(Promise.reject('test'))
				},
				'passport-local' : {
					Strategy : function(authenticate){
						this.authenticate = authenticate;
					}
				}
			});
			
			mongoLocalStrategy.authenticate('user', 'password', (err, user, message) => {
				try {
					should.exist(err);
					done();
				}
				catch(err){
					done(err);
				}
			});
		});
		it('It returns a message and false if it fails to get user', () =>{
			var mongoLocalStrategy = proxyquire('../MongoLocalStrategy',{
				'auth-server/auth/local/LocalUserAPIStore' : {
					getUserHash: sinon.stub().returns(Promise.resolve())
				},
				'passport-local' : {
					Strategy : function(authenticate){
						this.authenticate = authenticate;
					}
				}
			});
			
			mongoLocalStrategy.authenticate('user', 'password', (err, user, message) => {
				try {
					user.should.be.false();
					should.exist(message);
					should.not.exist(err);
					done();
				}
				catch(err){
					done(err);
				}
			});
		});
		it('It returns the user from the database', () =>{
			var returnedUser = {
				username: 'pesson',
				firstName: 'John',
				lastName: 'Von Ballarat und Melbourne',
			} 
			
			var mongoLocalStrategy = proxyquire('../MongoLocalStrategy',{
				'auth-server/auth/local/LocalUserAPIStore' : {
					getUserHash: sinon.stub().returns(Promise.resolve({})),
					getUser: sinon.stub().returns(Promise.resolve({returnedUser}))
				},
				'passport-local' : {
					Strategy : function(authenticate){
						this.authenticate = authenticate;
					}
				},
				'auth-server/util/PasswordCrypto' : {
					checkPassword : sinon.stub().returns(Promise.resolve({}))
				}
			});
			
			mongoLocalStrategy.authenticate('user', 'password', (err, user, message) => {
				try {
					user.should.equal(returnedUser);
					should.not.exist(message);
					should.not.exist(err);
					done();
				}
				catch(err){
					done(err);
				}
			});
		});
	});
});