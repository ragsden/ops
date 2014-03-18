var AccountStat = require('../lib/stats/schema').AccountStat;
var logger = require('../lib/logger');
module.exports.filter = function (req,res) {
	var startDate = null,
	endDate = null,
	query = {};

	if(req.query && req.query.createdBefore) {
		startDate = new Date(req.query.createdBefore);
		if(!isValidDate(startDate))
		{
			return res.send(400,"INVALID_CREATED_BEFORE_DATE");
		}
		query.created = {
			$gte: startDate.toISOString()
		};
	}

	if (req.query && req.query.createdAfter) {
		endDate = new Date(req.query.createdAfter);
		if(!isValidDate(endDate))
		{
			return res.send(400,"INVALID_CREATED_AFTER_DATE");
		}

		if(startDate && endDate && startDate.getTime() === endDate.getTime()) {
			endDate.setHours(23,59,59,000);
			logger.info('Making end date to EOD ' + endDate);
		}

		if (!query.created) { query.created = {}; };
		query.created.$lt = endDate.toISOString();
	}

	AccountStat.find(query,function(err,accountStats) {
		if(err) {
			logger.error('Error getting account stats ' + err);
			res.send(500);
		}
		else {
			res.json(accountStats);
		}
	});
}

function isValidDate(d) {
  if ( Object.prototype.toString.call(d) !== "[object Date]" )
    return false;
  return !isNaN(d.getTime());
}