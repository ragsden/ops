
'use strict';

//sample controller


angular.module('angSpa').controller('containerController',['$scope','$http','$routeParams','$cookieStore',
	function($scope, $http,$routeParams,$cookieStore) 
	{
	var APP_MODE="TEST";
	var middlewareUrl = "http://api.shippable.com";
	if(APP_MODE === 'TEST') {
		console.log('test mode');
		$scope.subscriptionName = "Trail Subscription";
		$scope.nodes = [
			{ 
				'status': 'queued', 
				'type': 'Node-Type-1', 
				'created': '2013-Dec-01 13:54 PM (PST)', 
				'updated' : '2014-Jan-03 22:54 PM (PST)'
			},
			{ 
				'status': 'adminProviisioning', 
				'type': 'Node-Type-2', 
				'created': '2013-Dec-01 13:54 PM (PST)', 
				'updated' : '2014-Jan-03 22:54 PM (PST)'
			},
			{ 
				'status': 'buildInProgress', 
				'type': 'Node-Type-1', 
				'created': '2013-Dec-01 13:54 PM (PST)', 
				'updated' : '2014-Jan-03 22:54 PM (PST)'
			}
		];
		$scope.errors = [];
	}
  	else {
  		$scope.errors = [];
  		$scope.nodes = [];
  		$scope.name= '';
  		var token = $cookieStore.get('shippable-token');
  		if(!token) {
  			console.log('No cookie found');
  			$scope.errors.push('Not a authenticated user');
  		}
  		else 
  		{
  			//Make $http call to get some real data..
  			console.log('Hitting middleware');
	  		$http.defaults.headers.common['Authorization']='token ' + token;
	  		$http.defaults.headers.common['Content-Type']='application/json;charset=utf8';
	  		var found = false;
	  		//Get the profile data..
	  		var accountInfoUrl = middlewareUrl + "/accounts/" + $routeParams.accountId;
	  		$http.get(accountInfoUrl).success(function(data) {
	  			var profile = data.identities;
	  			for(var i=0;i<profile.length;i++) {
	  				if(profile[i].provider === 'github') {
	  					$scope.name = profile[i].username;
	  					found = true;
	  					break;
	  				}
	  			}
	  			if(!found) {
	  				$scope.errors.push('No valid github profiles found for this user');
	  			}

	  		}).error(function(data) {
	  			console.log('Error getting account information');
	  			$scope.name = '';
	  			$scope.errors.push('There was a error getting the account information');
	  		});

	  		//Get the container data..
	  		var containerInfoUrl = middlewareUrl + "/subscriptions" + $routeParams.subscriptionId+"/nodes";
	  		$http.get(containerInfoUrl).success(function(data) {
	  			for(var i=0;i<data.length;i++) {
	  				$scope.nodes.push({ 
	  					'status' : data[i].status,
	  					'type' : data[i].type,
	  					'created': data[i].created,
	  					'updated' : data[i].updated  
	  				});
	  			}
	  		}).error(function(data) {
	  			console.log('Error getting subscription information');
	  			$scope.errors.push("There was a error getting subscription information");
	  		});
  		}
  	}

}]);