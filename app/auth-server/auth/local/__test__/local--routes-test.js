var should = require('should');
var proxyquire = require('proxyquire');
var sinon = require('sinon');

describe('local--routes', () => {   
	describe('/auth/local/login', () => {
		describe('POST', () => { 
			
		});
	});
	
	describe('/auth/local/login', () => {
		describe('GET', () => { 
			it('Returns the current user details as a JSON object', () => {
				var user = {
					username: 'pesson',
					fullname: 'John Smith',
					nickname: 'Rodger'
				};
				var res = {
					json: (obj) => obj
				};
				
				var localRoutes = require('../local--routes');
				localRoutes['/local/details'].get({user: user}, res, {})
					.should.equal(user);
			});
		});
	});
});   
