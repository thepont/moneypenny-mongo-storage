var proxyquire = require('proxyquire');
var sinon = require('sinon');
describe('logger', () => {
	it('Exposes the windston logger', () =>{
		var fakeLogger = {name: 'fakeLogger'};
		var logger = proxyquire('../logger', {
			'winston' : fakeLogger
		});
		logger.should.equal(fakeLogger);
	});
});