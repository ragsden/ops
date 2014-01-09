
'use strict';

//sample controller


angular.module('angSpa').controller('containerController',['$scope','$routeParams',
	'NodeService','NodeTypeService',
	function($scope,$routeParams,nodeService,nodeTypeService) 
	{
		//Model
		$scope.selectedNodeId = "";
		$scope.nodeTypes = [];
		$scope.nodes = [];
		$scope.errors = [];

		if(config.runMode.toLowerCase() === "test") {
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
		$scope.errorsandMessages = [];
		$scope.nodeTypes = [
			{ 'id' : '1234-4567-35256','name' : 'Test-1'},
			{ 'id' : '1234-4567-35256','name' : 'Test-2'}
		];
		$scope.selectedNodeId = $scope.nodeTypes[0].id;
		$scope.addNode = function() {
			$scope.errors.push('Calling Add for in test mode. Nothing executed');
		}
	}
  	else {
  		$scope.addNode = function() {
  			nodeService.createNodeForSubscriptionId($routeParams.subscriptionId,$scope.selectedNodeId,
  				function(err,data) {
  					if(err) {
  						if(err === 403) {
  							$scope.errors.push('Error creating subscription. Node quota expired');
  						}
  						else if(err === 202) {
  							$scope.errors.push('The container has been queued for provisioning');
  						}
  					}
  					else {
  						$scope.errors.push('No status returned for creating a node for this subscription');
  					}
  			});
  		}

  		nodeTypeService.getAllNodeTypes(function(err,data) {
  			if(err) {
  				$scope.errors.push('Error getting node types');
  			}
  			else {
  				if(data) {
  					for(var x = 0; x<data.length;x++) {
  						if(x === 0) {
  							$scope.selectedNodeId = data[x].id;
  						}
  						$scope.nodeNames.push({ 'id' : data[x].id, 'name' : data[x].name });
  					}
  				}
  			}
  		});
  			
		nodeService.getNodesBySubscriptionId($routeParams.subscriptionId,function(err,data) {
			if(err) {
				$scope.errors.push('Error getting container information');
			}
			else {
				if(data) {
					for(var i=0;i<data.length;i++) {
		  				$scope.nodes.push({ 
		  					'id' : data[i].id,
		  					'status' : data[i].status,
		  					'type' : data[i].type,
		  					'created': data[i].created,
		  					'updated' : data[i].updated  
		  				});
		  			}
	  			}
  			}
		});
  	}

}]);

