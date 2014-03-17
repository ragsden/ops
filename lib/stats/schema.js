var mongoose = require("mongoose"),
Schema = mongoose.Schema;

var accountStatSchema = mongoose.Schema({
	accountId : String,
	created : Date
});

var settingSchema = mongoose.Schema({ lastRunTime : Date });


var AccountStat = mongoose.model("AccountStat", accountStatSchema);
var Setting = mongoose.model("Setting",settingSchema);
module.exports.AccountStat = AccountStat;
module.exports.Setting = Setting;
