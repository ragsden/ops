var mongoose = require("mongoose"),
Schema = mongoose.Schema;

var accountStatSchema = mongoose.Schema({
	accountId : String,
	created : Date
});
var accountDataSchema = mongoose.Schema({ queryDate: Date, totalNewUsers: Number });
var settingSchema = mongoose.Schema({ lastRunTime : Date });


var AccountStat = mongoose.model("AccountStat", accountStatSchema);
var Setting = mongoose.model("Setting",settingSchema);
var AccountData = mongoose.model('AccountData',accountDataSchema);
module.exports.AccountStat = AccountStat;
module.exports.Setting = Setting;
module.exports.AccountData = AccountData;
