var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var config = require('./config');
passport.serializeUser(function(Id,done) {
  done(null,Id);
});

passport.deserializeUser(function(Id,done) {
	done(null,Id);
});

function getGithubStrategy() {
	var g =  new GitHubStrategy({
        clientID: config.passport.github.clientId,
        clientSecret:config.passport.github.secret,
        callbackURL:config.passport.github.callbackUrl
    }, function(accessToken,refreshToken,profile,done) {
    	console.log('Authenticated ' + profile.username);
    	//TODO: Make MW API calls.
    	done(null,'Dummy');
    });

    return g;
}

exports.init = function() {

    passport.use(getGithubStrategy());
};