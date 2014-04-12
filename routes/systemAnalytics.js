var AccountStat = require('../lib/stats/schema').AccountStat;
var Setting = require('../lib/stats/schema').Setting;
var logger = require('../lib/logger');
module.exports.getTotalUsers = function (req,res,next) {
	AccountStat.count(function(err,c) {
		if(err) {
			logger.error('Error getting total count');
			res.send(500);
		}
		else {
			req.totalUsers = c;
			next();
		}
	});
};
module.exports.getLastRunTime = function(req,res,next) {
	Setting.findOne(null,function(err,setting) {
		console.log(setting);
		if(err) {
			logger.error('Error getting last run status');
			res.send(500);
		}
		else {
			req.lastRun = '';
			if(!setting) {
				logger.info('No last run');
				req.lastRun = 'N/A';
			}
			else {
				req.lastRun = setting.lastRunTime;
			}
			next();
		}
	});
};
module.exports.finished = function(req,res) {
	var data = {};
	data.lastRun = req.lastRun;
	data.totalUsers = req.totalUsers;
	res.json(data);
};