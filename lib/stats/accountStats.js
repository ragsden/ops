var schema = require('./schema'),
	_ = require("underscore"),
	config = require('../../config');
var middleware = require('./middleware');
var nock = require('nock');
exports.getFilteredAccounts = function(req,err,next) {
	
	var url = config.middleware.endPoint+"/accounts/filter?from="+req.start+"&to="+req.end;
	middleware.get(url,"",function (status,data) {
		if(status) {
			err(status);
		}
		else {
			req.data = data;
			next();
		}
	});
}

//Translate data to accountStats object
exports.createAccountStats = function(req,err,next) {
	if(!req.data) {
		err('No account data present');
	}
	else {
		req.accountStats = [];
		_.each(req.data,function(d) {
			var AccountStat = new schema.AccountStat();
			AccountStat.accountId = d.accountId;
			AccountStat.created = d.created;
			req.accountStats.push(AccountStat);
		});
		next();
	}
	
}

exports.saveAccountStats = function (req,err,next) {
	if(!req.accountStats) { err('Nothing to save'); }
	else {
		_.each(req.accountStats,function(accountStat) {
			accountStat.save(function(error) {
				if(error) { err ('Error saving account stats.. ' + error); }
			});
		});
		next();
	}
}

