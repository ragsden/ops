var schema = require('./schema'),
_ = require("underscore"),
logger = require("../logger"),
config = require('../../config');
var middleware = require('./middleware');
var AccountStats = function() { };

AccountStats.prototype.markAccountStats = function(req,next) {
	if(!req.accountStats) { next('No data to mark'); }
	else {
		var accountData = new schema.AccountData();
		accountData.queryDate = req.end;
		accountData.totalNewUsers = req.accountStats.length;
		accountData.save(function(err) {
			if(err) { logger.error('error marking account stats'); next(err); }
			else { next(); }
		});
	}
}

AccountStats.prototype.saveAccountStats = function (req,next) {
	var that = this;
	if(!req.accountStats) { next('Nothing to save'); }
	else {
		_.each(req.accountStats,function(accountStat) {
			accountStat.save(function(error) {
				if(error) { next ('Error saving account stats.. ' + error); }
			});
		});
		that.markAccountStats(req,next);
	}
}


//Translate data to accountStats object
AccountStats.prototype.createAccountStats = function(req,next) {
	var that = this;
	if(!req.data) {
		next('No account data present');
	}
	else {
		req.accountStats = [];
		_.each(req.data,function(d) {
			var AccountStat = new schema.AccountStat();
			AccountStat.accountId = d.id;
			AccountStat.created = d.created;
			req.accountStats.push(AccountStat);
		});
		that.saveAccountStats(req,next);
	}
	
}

AccountStats.prototype.getFilteredAccounts = function(req,next) {
	var that = this;
	var url = config.middleware.endPoint+"/accounts?createdBefore="+req.start+"&createdAfter="+req.end;
	middleware.get(url,config.MWToken,function (status,data) {
		if(status) {
			next(status);
		}
		else {
			req.data = data;
			that.createAccountStats(req,next);
		}
	});
}




module.exports = AccountStats;