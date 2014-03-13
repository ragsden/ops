var should = require('should');
var sinon = require('sinon');
var nock = require('nock');
var config = require('../../../config');
var mock = require('../node-mock-data');
var accountStats = require('../../../lib/stats/accountStats');
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
        accountStats.getFilteredAccounts(req,res,next);
        next.calledOnce.should.equal(true);
        req.should.have.property('data');
        req.data.length.should.equal(2);

        mwStub.restore();
	});
	it('creates accountStats object based on schema',function() {
		var next = sinon.spy();
		var req = { data : mock.testStatsData.accountStats };
		accountStats.createAccountStats(req,{},next);
		next.calledOnce.should.equal(true);
		req.should.have.property('accountStats');
		req.accountStats.length.should.equal(2);
	});
	it('errors out if createAccountStats is called without data',function() {
		var req = { };
		var err = sinon.spy();
		var next = sinon.spy();
		accountStats.createAccountStats(req,err,next);
		err.calledOnce.should.equal(true);
	});
	it('saves the report',function() {
		var host = new schema.AccountStat();
	    var stub = sinon.stub(host,"save");
	    var req = {
	        accountStats : [host]
	    };
	    var err = sinon.spy();
	    accountStats.save(req,err);
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
        accountStats.getFilteredAccounts(req,res,next);
        res.calledOnce.should.equal(true);
        next.calledOnce.should.equal(false);
        
        mwStub.restore();
	});
});