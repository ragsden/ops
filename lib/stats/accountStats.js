var schema = require('./schema'),
	_ = require("underscore"),
	config = require('../../config');
var middleware = require('./middleware');
var AccountStats = function() { };

AccountStats.prototype.saveAccountStats = function (req,next) {
	if(!req.accountStats) { next('Nothing to save'); }
	else {
		_.each(req.accountStats,function(accountStat) {
			accountStat.save(function(error) {
				if(error) { next ('Error saving account stats.. ' + error); }
			});
		});
		next();
	}
}


//Translate data to accountStats object
AccountStats.prototype.createAccountStats = function(req,next) {
	var that = this;
	console.log(req.data);
	if(!req.data) {
		next('No account data present');
	}
	else {
		req.accountStats = [];
		_.each(req.data,function(d) {
			var AccountStat = new schema.AccountStat();
			AccountStat.accountId = d.accountId;
			AccountStat.created = d.created;
			req.accountStats.push(AccountStat);
		});
		that.saveAccountStats(req,next);
	}
	
}

AccountStats.prototype.getFilteredAccounts = function(req,next) {
	var that = this;
	var url = config.middleware.endPoint+"/accounts/filter?from="+req.start+"&to="+req.end;
	console.log(url);
	middleware.get(url,"06d7b1c7-70ea-4ea1-8538-d1f081f742d0",function (status,data) {
		if(status) {
			next(status);
		}
		else {
			req.data = data;
			console.log(req);
			that.createAccountStats(req,next);
		}
	});
}




module.exports = AccountStats;