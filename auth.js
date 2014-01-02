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

function getShippableToken(accessToken,done) {

	var postData = {
                          provider:'github',
                          accessToken: {
                          	token: accessToken
                          }
                        };
                        var d = qs.stringify(postData);
         request.post({
                          url: config.middleware.endPoint + "/accounts/tokens",
                          body: d,
                          headers: {
                            'Content-Type': 'application/json;charset=utf-8',
                            'Content-Length' : d.length
                          }
                        }, function(err, res, data){
                          //console.log(data);
                          if (err) {
                            console.log(err);
                            done(err);
                          } else if (res.statusCode > 200) {
                            done(new Error("Status code: "+ res.statusCode),null);
                          } else if (data === "Not found.") {
                            done(new Error("Undefined."),null);
                          } else {
                            data = JSON.parse(data);
                            return done(null,{ token: data.token });
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
