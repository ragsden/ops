var stats = require('./stats');

console.log('This will rebase analytics database!');
console.log('Press any key to proceed');
var stdin = process.stdin;
stdin.resume();
stdin.once('data',function(data) {
	stats.collectAnalytics();
	console.log('Finished rebasing');
	process.exit();
});
