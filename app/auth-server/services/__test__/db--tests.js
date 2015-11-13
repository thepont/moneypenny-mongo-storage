var sinon = require('sinon');
var proxyquire = require('proxyquire');

describe('db', () => {
	describe('conn', () => {
		it('Is an istance of mongodb.Db', () =>{
			var dbIntFunction = sinon.stub();
			var db = function(){
				dbIntFunction();
				this.open = () => {};
				this.collection = () => {};
			}
			
			proxyquire('../db', {
				'mongodb' : {
					Db : db
				}
			});
			dbIntFunction.calledOnce.should.be.true();
		});
	});
	
	describe('db', () => {
		var db = function(){
				this.open = () => {};
				this.collection = (collection) => collection;
			}
			
		var db = proxyquire('../db', {
			'mongodb' : {
				Db : db
			}
		});
		
		it('Contains local_users collection', () =>{
			db.local_users.should.equal('local_users');
		});
		
		it('Contains session_users collection', () =>{
			db.session_users.should.equal('session_users');
		});
		
		it('Contains oauth_refresh_token collection', () =>{
			db.oauth_refresh_token.should.equal('oauth_refresh_token');
		});
		
		it('Contains oauth_token collection', () =>{
			db.oauth_token.should.equal('oauth_token');
		});
		
		it('Contains oauth_client_store collection', () =>{
			db.oauth_client_store.should.equal('oauth_client_store');
		});
		it('Logs an error if it fails to open the connection', () =>{
			const ERROR_MESSAGE = 'ERROR ERRROR';
			var loggerError = sinon.stub();
			var db = function(){
				this.open = (cb) => cb(ERROR_MESSAGE);
				this.collection = () => {};
			}
			var db = proxyquire('../db', {
				'mongodb' : {
					Db : db
				},
				'auth-server/util/logger' : {
					debug : ()=>{},
					info : ()=>{},	
					warn : ()=>{},
					error: loggerError
				}
			});
			loggerError.calledWith(ERROR_MESSAGE).should.be.true();
		});
		
	});
});