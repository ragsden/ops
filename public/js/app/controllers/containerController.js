
'use strict';

//sample controller


angular.module('angSpa').controller('containerController',['$scope','$http','APP_MODE',function($scope, $http,APP_MODE) {
	if(APP_MODE === 'TEST') {
		console.log('test mode');
		$scope.name = 'User_Name';
		$scope.email = 'foo@goo.com';
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
	}
  	else {
  		//Make $http call to get some real data..
  	}

}]);