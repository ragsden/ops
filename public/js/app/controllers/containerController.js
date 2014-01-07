
'use strict';

//sample controller


angular.module('angSpa').controller('containerController',['$scope','$http','$routeParams','$cookieStore','ContainerService',
	function($scope, $http,$routeParams,$cookieStore,containerService) 
	{
	if(config.runMode === 'TEST') {
		console.log('test mode');
		$scope.nodes = [
			{ 
				'Id': '2340-3433-5874-6873',
				'status': 'queued', 
				'type': 'Node-Type-1', 
				'created': '2013-Dec-01 13:54 PM (PST)', 
				'updated' : '2014-Jan-03 22:54 PM (PST)'
			},
			{ 
				'Id': '2340-3433-5874-6873',
				'status': 'adminProviisioning', 
				'type': 'Node-Type-2', 
				'created': '2013-Dec-01 13:54 PM (PST)', 
				'updated' : '2014-Jan-03 22:54 PM (PST)'
			},
			{ 
				'Id': '2340-3433-5874-6873',
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
  		
  		var token = $cookieStore.get(config.tokenId);
  		token = "x";
  		if(!token) {
  			console.log('No cookie found');
  			$scope.errors.push('Not a authenticated user');
  		}
  		else 
  		{
  			//Make $http call to get some real data..
  			console.log('Hitting middleware ' + config.MW_URL);
  			
			containerService.getContainerInfo($routeParams.subscriptionId,token,function(profileData) {
				$scope.nodes =  profileData.nodes;
				$scope.errors = profileData.errors;
			});
  		}
  	}

}]);

angular.module('angSpa').factory('ContainerService',function($http) {
	var middlewareUrl = config.MW_URL;
	return {

		getContainerInfo: function(subscriptionId,token,done) {
			var profileData = {};
			profileData.nodes = [];
			profileData.errors=[];
			var containerInfoUrl = middlewareUrl + "/subscriptions/" + subscriptionId+"/nodes";
	  		$http(
	  			{
	  				method: 'GET', 
	  				url: containerInfoUrl, 
	  				headers: {
	  					'Authorization': 'token ' + token,
	  					'Content-Type' : 'application/json;charset=utf8'
	  					 }
	  			})
	  		.success(function(data) {
	  			for(var i=0;i<data.length;i++) {
	  				profileData.nodes.push({ 
	  					'id' : data[i].id,
	  					'status' : data[i].status,
	  					'type' : data[i].type,
	  					'created': data[i].created,
	  					'updated' : data[i].updated  
	  				});
	  				done(profileData);
	  			}
	  		}).error(function(data) {
	  			console.log('Error getting subscription information ' + data);
	  			profileData.errors.push("There was a error getting subscription information");
	  			done(profileData);
	  		});
		}
	}
});