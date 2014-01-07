var settings = require('./settings');
exports.passport = {

    github: {
        clientId: settings.passport.github.clientId,
        secret: settings.passport.github.secret,
        callbackUrl: settings.passport.github.callbackUrl
    }
};
exports.middleware = {
	endPoint: settings.middleware.endPoint
};
   
