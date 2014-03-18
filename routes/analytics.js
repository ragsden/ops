module.exports.init = function(app) {

	var accountAnalytics = require('./accountAnalytics')
	, systemAnalytics = require('./systemAnalytics');
	app.get('/analytics/accounts',accountAnalytics.filter);
	app.get('/analytics/system',systemAnalytics.getTotalUsers,systemAnalytics.getLastRunTime,systemAnalytics.finished);
};