var should = require('should');
var sinon = require('sinon');
var schema = require('../../../lib/stats/schema');
describe('Stats Schema',function () {

	it('validates accountsStats schema',function() {
		var AccountStat = new schema.AccountStat();

		AccountStat.schema.tree.should.have.property('accountId');
		AccountStat.schema.tree.should.have.property('created');
	});

	it('validates Stats schema',function() {
		var Stats = new schema.Stats();

		Stats.schema.tree.should.have.property('lastRunTime');
	});
});