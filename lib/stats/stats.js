/*
The stats module is basically a collection of APIs that 
are run one after the other to collect details about the 
main product. 
The cron job executes based on the cron pattern given in the start of the application
and then dumps the data to the store. 
*/

var schema = require('./schema');
var config = require('../../config');
var AccountStats = require('./accountStats');

function finished() {
	Stats.findOne(null,function(err,stat) {
		if(err) {
			console.log('unable to save last query time.');
			console.log(err);
		}
		else {
			stat.lastRunTime = new Date();
			stat.save(function(error,s) {
				if(error) {
					console.log('error saving stats');
				}
			});
		}
	});
}
function collectAnalytics() {
	console.log('Collecting Analytics..');
	var Stats = schema.Stats;
	Stats.findOne(null,function(err,stat) {
		if(err) {
			console.log(err);
		}
		var lastQueryDate = '';
		if(!stat) {
			console.log('first run');
			lastQueryDate = config.analyticsQueryDate;
		}
		else {
			lastQueryDate = stat.lastQueryDate;
		}
		var analyticsRequest = { start : lastQueryDate, end : lastQueryDate };	
		var accountStats = new AccountStats();
		accountStats.getFilteredAccounts(analyticsRequest,function(err) {
			if(err) {
				console.log('Error getting account statistics');
				console.log(err);
			}
			else {
				console.log('finished collecting account statistics');
			}
		});		

	});
	
}
function init() {
	var cronJob = require('cron').CronJob;
	var job = new cronJob(config.cronJobPattern,collectAnalytics,finished,true);

}
exports.collectAnalytics = collectAnalytics;
exports.init = init;

