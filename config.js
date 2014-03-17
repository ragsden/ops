exports.passport = {

    github: {
        clientId: process.env.clientId || '5a4c38eeb2aa32a15062',
        secret:process.env.clientSecret || 'c3f2c2ea135662116476b739993b3eead2c32592',
        callbackUrl: process.env.callbackUrl || 'http://localhost:31154/auth/github/callback'
    }
};
exports.middleware = {
	endPoint: process.env.MWEndPoint || 'https://apibeta.shippable.com'
};
exports.port = process.env.port || 31154; 
   
exports.runMode = process.env.runMode || "TEST";
exports.shippableTokenIdentifier = process.env.tokenIdentifier || "ops.shippable.com:token";
exports.analyticsQueryDate = process.env.analyticsQueryDate || "2014-03-17";
exports.db = {
  "host" : process.env.SHIPPABLE_ANALYTICS_DB || "127.0.0.1",
  "port" : 27017,
  "database" : process.env.SHIPPABLE_ANALYTICS_DB_NAME || "opsdashboard_test",
};
exports.cronJobPattern = "00 59 23 * * *";