/*
The stats module is basically a collection of APIs that 
are run one after the other to collect details about the 
main product. 
The cron job executes based on the cron pattern given in the start of the application
and then dumps the data to the store. 
*/

var schema = require('./schema');
var accountStats = require('./accountStats');
function failure(err) {
	console.log('Error collecting analytics');
	console.log(err);
}
function finished(analyticsRequest) {
	console.log('finished collecting analytics');
}
function collectAnalytics() {
	console.log('Collecting Analytics..');
	var Stats = schema.Stats;
	Stats.findOne(null,function(err,stat) {
		var lastQueryDate = '';
		if(!stat) {
			console.log('first run');
			lastQueryDate = process.env.analyticsQueryDate;
		}
		else {
			lastQueryDate = stat.lastQueryDate;
			var analyticsRequest = { start : lastQueryDate, end : lastQueryDate };	
			accountStats.getFilteredAccounts
			(
				analyticsRequest,
				failure,
				createAccountStats,
				saveAccountStats,
				finished
			);		


		}
	});
	
}

exports.collectAnalytics = collectAnalytics;