exports.passport = {

    github: {
        clientId: process.env.clientId || 'e8f64f80ba84da0343a6',
        secret:process.env.clientSecret || 'd29b4b722997c9526f51fd49857599a85b1c7a52',
        callbackUrl: process.env.callbackUrl || 'http://10.0.0.3:3000/auth/github/callback'
    }
};
exports.middleware = {
	endPoint: process.env.MWEndPoint || 'https://apibeta.shippable.com'
};
exports.port = process.env.port || 3000; 
   
exports.runMode = process.env.runMode || "";
exports.shippableTokenIdentifier = process.env.tokenIdentifier || "ops.shippable.com:token";
