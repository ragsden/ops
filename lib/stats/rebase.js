var stats = require('./stats');
var mongoose = require('mongoose');
var config = require('../../config');
mongoose.set('debug', true);
console.log('connecting to.. ' + config.db.host);
mongoose.connect(config.db.host);
var shouldRetry = true;

mongoose.connection.on('error', function(error) {
console.log("Mongodb connection error: " + error);
if (shouldRetry) {
  setTimeout(function() {
    mongoose.connect(config.db.host);
  }, 1000);
}
});

///TODO: only proceed if messagequeue is connected
mongoose.connection.once('open', function() {
console.log("MongoDB connected");
shouldRetry = false;
console.log('This will rebase analytics database!');
console.log('Press any key to proceed');
var stdin = process.stdin;
stdin.resume();
stdin.once('data',function(data) {
	stats.collectAnalytics();
	//console.log('Finished rebasing');
	//process.exit();
});
});