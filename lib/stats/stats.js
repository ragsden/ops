/*
The stats module is basically a collection of APIs that 
are run one after the other to collect details about the 
main product. 
The cron job executes based on the cron pattern given in the start of the application
and then dumps the data to the store. 
*/

var schema = require('./schema');
var config = require('../../config');
var logger = require("../logger");
var AccountStats = require('./accountStats');
var Setting = schema.Setting;
function finished() {
	Setting.findOne(null,function(err,setting) {
		if(err) {
			console.log('unable to save last query time.');
			console.log(err);
		}
		else {
			if(!setting) { setting = new Setting(); }
			setting.lastRunTime = new Date();
			setting.save(function(error,s) {
				if(error) {
					console.log('error saving stats');
				}
			});
		}
	});
}
function collectAnalytics() {
	logger.info('Collecting Analytics..');
	
	Setting.findOne(null,function(err,stat) {
		if(err) {
			console.log(err);
		}
		var lastQueryDate = '';
		if(!stat) {
			logger.info('first run');
			lastQueryDate = config.analyticsQueryDate;
		}
		else {
			lastQueryDate = stat.lastRunTime;
		}
		logger.info('Last query date ' + lastQueryDate);
		var analyticsRequest = { start : lastQueryDate, end : new Date() };	
		var accountStats = new AccountStats();
		accountStats.getFilteredAccounts(analyticsRequest,function(err) {
			if(err) {
				logger.error('Error getting account statistics');
				logger.error(err);
			}
			else {
				logger.info('finished collecting account statistics');
				finished();
			}
		});		

	});
	
}
function init() {
	logger.info('Init analytics job');	
	var cronJob = require('cron').CronJob;
	var job = new cronJob(config.cronJobPattern,collectAnalytics,finished,true);

}
exports.collectAnalytics = collectAnalytics;
exports.init = init;

