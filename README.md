Shippable Ops-Dashboard

Setup
-----------------------
Install the following..
	1.	Nodejs	
	2.	NPM		
	3.	Upstart
Steps to run..
------------------------
	After pulling the latest code, make a copy of settings.js ```cp settings.js config.js```
	Copy ```opsDashboard.conf``` to ```/etc/init```   ```sudo cp opsDashboard.conf /etc/init```
	Edit ```/etc/init/opsDashboard.conf``` and specify ```NODE_PATH``` and ```CODE_DIRECORY``` 
	```sudo start opsDashboard``` will start the app listening on port 3000
	The log file is stored in ```/var/log/opsDashboard.log```.

Development
---------------------------
	Install supervisor if required.. ```npm install -g supervisor```
	Install Karma ```npm install -g karma```
	Install PhantomJS	```sudo apt-get install phantomjs```

	```npm install```
	```npm start``` will start the app using supervisor

	```make coverage``` will run unit tests and create coverage output in ```shippable``` folder.

