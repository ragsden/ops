var should = require('should');
var sinon = require('sinon');

describe('Account analytics',function() {
	it('gets total users from db and calls next');
	it('returns 400 if total users cannot be retrieved');
	it('gets last run time from db and calls next');
	it('get N/A if there is no db entry');
	it('returns 500 if there was a error for getting last run time');
	it('sends the collected data as response');
});