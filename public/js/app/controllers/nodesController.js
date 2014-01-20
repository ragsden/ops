
'use strict';

//sample controller


angular.module('angSpa').controller('nodesController',['$scope','$routeParams',
	'NodeService','NodeTypeService',
	function($scope,$routeParams,nodeService,nodeTypeService) 
	{
		//Model
		$scope.selectedNodeId = "";
		$scope.nodeTypes = [];
		$scope.nodes = [];
		$scope.errorsAndMessages = [];
		$scope.nodeStatuses = ['Queued','Node Ready','Admin Ready','Worker Ready','User setup','Node Stopped','Build in progress'];

		if(config.runMode.toLowerCase() === "test") {
		$scope.nodes = [
			{ 
				'Id': '2340-3433-5874-6873',
				'status': 0, 
				'type': '1234-4567-35256', 
				'created': '2013-Dec-01 13:54 PM (PST)', 
				'updated' : '2014-Jan-03 22:54 PM (PST)'
			},
			{ 
				'Id': '2340-3433-5874-6873',
				'status': 1, 
				'type': '1234-4567-35216', 
				'created': '2013-Dec-01 13:54 PM (PST)', 
				'updated' : '2014-Jan-03 22:54 PM (PST)'
			},
			{ 
				'Id': '2340-3433-5874-6873',
				'status': 2, 
				'type': '1234-4567-35256', 
				'created': '2013-Dec-01 13:54 PM (PST)', 
				'updated' : '2014-Jan-03 22:54 PM (PST)'
			},
			{ 
				'Id': '2340-3433-5874-6873',
				'status': 3, 
				'type': '1234-4567-35256', 
				'created': '2013-Dec-01 13:54 PM (PST)', 
				'updated' : '2014-Jan-03 22:54 PM (PST)'
			},
			{ 
				'Id': '2340-3433-5874-6873',
				'status': 4, 
				'type': '1234-4567-35256', 
				'created': '2013-Dec-01 13:54 PM (PST)', 
				'updated' : '2014-Jan-03 22:54 PM (PST)'
			},
			{ 
				'Id': '2340-3433-5874-6873',
				'status': 5, 
				'type': '1234-4567-35256', 
				'created': '2013-Dec-01 13:54 PM (PST)', 
				'updated' : '2014-Jan-03 22:54 PM (PST)'
			},
			{ 
				'Id': '2340-3433-5874-6873',
				'status': 6, 
				'type': '1234-4567-35256', 
				'created': '2013-Dec-01 13:54 PM (PST)', 
				'updated' : '2014-Jan-03 22:54 PM (PST)'
			}
		];
		$scope.errorsAndMessages = [];
		$scope.nodeTypes = [
			{ 'id' : '1234-4567-35256','name' : 'Test-1'},
			{ 'id' : '1234-4567-35256','name' : 'Test-2'}
		];
		$scope.selectedNodeId = $scope.nodeTypes[0].id;
		$scope.addNode = function() {
			$scope.errorsAndMessages.push('Calling Add for in test mode. Nothing executed');
		}
		$scope.deleteNode = function(nodeId) {
			$scope.errorsAndMessages.push('Called node delete in test mode. Nothing executed');
		}
	}
  	else {
  		$scope.deleteNode = function(nodeId) {
  			nodeService.deleteNodeById($routeParams.subscriptionId,nodeId,
  				function(err,data) {
  					if(err) {
  						if(err === 202) {
  							$scope.errorsAndMessages.push('The container has been queued for deprovisioning');
  						}
  					}
  					else {
  						$scope.errorsAndMessages.push('No status returned for deleting the node ');
  					}
  			});
  		}

  		$scope.addNode = function() {
  			nodeService.createNodeForSubscriptionId($routeParams.subscriptionId,$scope.selectedNodeId,
  				function(err,data) {
  					if(err) {
  						if(err === 403) {
  							$scope.errorsAndMessages.push('Error creating subscription. ' + data);
  						}
  						else if(err === 202) {
  							$scope.errorsAndMessages.push('The container has been queued for provisioning');
  						}
  					}
  					else {
  						$scope.errorsAndMessages.push('No status returned for creating a node for this subscription');
  					}
  			});
  		}
  		nodeTypeService.getAllNodeTypes(function(err,data) {
  			if(err) {
  				$scope.errorsAndMessages.push('Error getting node types');
  			}
  			else {
  				if(data) {
  					for(var x = 0; x<data.length;x++) {
  						if(x === 0) {
  							$scope.selectedNodeId = data[x].id;
  						}
  						$scope.nodeTypes.push({ 'id' : data[x].id, 'name' : data[x].name });
  					}
  				}
  			}
  		});
  		nodeService.getNodesBySubscriptionId($routeParams.subscriptionId,function(err,data) {
			if(err) {
				$scope.errorsAndMessages.push('Error getting container information');
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

