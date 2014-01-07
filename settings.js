exports.passport = {

    github: {
        clientId:'5a4c38eeb2aa32a15062',
        secret:'c3f2c2ea135662116476b739993b3eead2c32592',
        callbackUrl:'http://localhost:3000/auth/github/callback'
    }
};
exports.middleware = {
	endPoint: 'http://ops.shippable.com'
};
   
exports.runMode = "TEST";
exports.tokenId = "ops.shippable.com:token";