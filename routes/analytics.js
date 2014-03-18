function ensureAuthenticated(req,res,next) {
	if(req.user) { next	(); }
	else { res.send(401); }
}
module.exports.init = function(app) {

	var accountAnalytics = require('./accountAnalytics')
	, systemAnalytics = require('./systemAnalytics');
	app.get('/analytics/accounts/new',ensureAuthenticated,accountAnalytics.getNewUsers);
	app.get('/analytics/accounts/filter',ensureAuthenticated,accountAnalytics.filter);
	app.get('/analytics/system',ensureAuthenticated,systemAnalytics.getTotalUsers,systemAnalytics.getLastRunTime,systemAnalytics.finished);
};