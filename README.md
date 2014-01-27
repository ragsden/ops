Shippable Ops-Dashboard

Setup
-----------------------
Install the following..
	1.	Nodejs	
	2.	NPM		
	3.	Grunt   ```npm install -g grunt-cli```
Steps to run..
------------------------
 	The app is run using command line arguments. See ```config.js``` for what the possible commands are..
	```npm start``` will start the app in test mode..
	```runMode=live npm start``` will try to hit the MW API server.

Development
---------------------------
	Install supervisor if required.. ```npm install -g supervisor```
	Install Karma ```npm install -g karma```
	Install PhantomJS	```sudo apt-get install phantomjs```
	```grunt``` will run ```karma``` with all unit tests and produce coverage output. It also runs jshint on all files inside ```public\js\app``` directory.
	
	Note: Shippable CI will fail if jshint check fails..

