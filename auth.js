var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var config = require('./config');
var request = require('request');
var qs = require('qs');
passport.serializeUser(function(Id,done) {
  console.log(Id);
  done(null,Id);
});

passport.deserializeUser(function(Id,done) {
	done(null,Id);
});

function getShippableToken(_accessToken,done) {

	var postData = {
      provider: "github",
      accessToken: {
        token: _accessToken
      }
    };
    request({
      method: "POST",
      url: config.middleware.endPoint + "/accounts/tokens",
      json: postData
    }, function(err, res, data){
      if (err) {
        console.log(err);
        done(err);
      } else if (res.statusCode > 200) {
        done(new Error("Status code: "+ res.statusCode),null);
      } else if (data === "Not found.") {
        console.log('err');
        done(new Error("Undefined."),null);
      } else {
        console.log('all is well');
        return done(null,data);
      }
    });
}

function getGithubStrategy() {
	var g =  new GitHubStrategy({
        clientID: config.passport.github.clientId,
        clientSecret:config.passport.github.secret,
        callbackURL:config.passport.github.callbackUrl
    }, function(accessToken,refreshToken,profile,done) {
    	console.log('Authenticated ' + profile.username);
    	getShippableToken(accessToken,done);
    	
    });

    return g;
}

exports.init = function() {

    passport.use(getGithubStrategy());
};
exports.getShippableToken = getShippableToken;
