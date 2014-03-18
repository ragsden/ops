var should = require('should');
var sinon = require('sinon');
var nock = require('nock');
var config = require('../../../config');
var mock = require('../node-mock-data');
var AccountStats = require('../../../lib/stats/accountStats');
var middleware = require('../../../lib/stats/middleware');
var schema = require('../../../lib/stats/schema');
describe('Account statistics',function () {
	it('calls accounts filter API with from and to dates and calls next',function() {
        var mwStub = sinon.stub(middleware,"get");
        mwStub.callsArgWith(2,null,mock.testStatsData.accountStats); //callsArg to simulate callback
        var next = sinon.spy();
        var req = {};
        req.from = '12345';
        req.to = '34567';
        var res = function() { };
        var accountStats = new AccountStats();
        accountStats.getFilteredAccounts(req,next);
        req.should.have.property('data');
        req.data.length.should.equal(2);
        mwStub.restore();
	});
	it('creates accountStats object based on schema',function() {
		var next = sinon.spy();
		var req = { data : mock.testStatsData.accountStats };
		var accountStats = new AccountStats();
		accountStats.createAccountStats(req,next);
		req.should.have.property('accountStats');
		req.accountStats.length.should.equal(2);
	});
	it('errors out if createAccountStats is called without data',function() {
		var req = { };
		var next = sinon.spy();
		var accountStats = new AccountStats();
		accountStats.createAccountStats(req,next);
		
	});
	it('saves the report',function() {
		var host = new schema.AccountStat();
	    var stub = sinon.stub(host,"save");
	    var req = {
	        accountStats : [host]
	    };
	    var next = sinon.spy();
	    var accountStats = new AccountStats();
	    accountStats.saveAccountStats(req,next);
	    stub.calledOnce.should.equal(true);
    	stub.restore();
	});

	it('fails if accounts API returns a error',function() {
		var mwStub = sinon.stub(middleware,"get");
        mwStub.callsArgWith(2,500,null); //callsArg to simulate callback
        var next = sinon.spy();
        var req = {};
        req.from = '12345';
        req.to = '34567';
        var res = sinon.spy();
        var accountStats = new AccountStats();
        accountStats.getFilteredAccounts(req,res,next);
        res.calledOnce.should.equal(true);
        next.calledOnce.should.equal(false);
        
        mwStub.restore();
	});
	it('churns statistics for accountStats that are returned',function() {
		var host = new schema.AccountData();
	    var stub = sinon.stub(host,"save");
	    var accountStat = new schema.AccountStat();
	    accountStat.accountId='12345';
	    accountStat.created = new Date();
	    var req = {
	        accountStats : [accountStat]
	    };
	    var next = sinon.spy();
	    var accountStats = new AccountStats();
	    accountStats.markAccountStats(req,next);
	    next.calledOnce.should.equal(false);
    	stub.restore();
	});
});