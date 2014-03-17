var mongoose = require("mongoose"),
Schema = mongoose.Schema;

var accountStatSchema = mongoose.Schema({
	accountId : String,
	created : Date
});

var statsSchema = mongoose.Schema({ lastRunTime : Date });


var AccountStat = mongoose.model("AccountStat", accountStatSchema);
var Stats = mongoose.model("Stats",statsSchema);
module.exports.AccountStat = AccountStat;
module.exports.Stats = Stats;
