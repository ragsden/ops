
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

                                    
                                      $scope.sort = {column:'created', descending: false};

                                      $scope.deleteNode = function(nodeId) {
                                        nodeService.deleteNodeById(nodeId,
                                                                   function(err,data) {
                                                                     if(err) {
                                                                       if(err === 202) {
                                                                         $scope.errorsAndMessages.push("The container has been queued for deprovisioning");
                                                                       }
                                                                     }
                                                                     else {
                                                                       $scope.errorsAndMessages.push("No status returned for deleting the node");
                                                                     }
                                                                     $scope.refresh();
                                                                   });
                                      };

                                      $scope.addNode = function() {
                                        nodeService.createNodeForSubscriptionId($routeParams.subscriptionId,$scope.selectedNodeId,
                                                                                function(err,data) {
                                                                                  if(err) {
                                                                                    if(err === 403) {
                                                                                      $scope.errorsAndMessages.push("Error creating subscription. " + data);
                                                                                    }
                                                                                    else if(err === 202) {
                                                                                      $scope.errorsAndMessages.push("The container has been queued for provisioning");
                                                                                    }
                                                                                  }
                                                                                  else {
                                                                                    $scope.errorsAndMessages.push("No status returned for creating a node for this subscription");
                                                                                  }
                                                                                  $scope.refresh();
                                                                                });
                                      };


                                      $scope.refresh = function() {


                                        $scope.changeSorting = function(column){
                                          if($scope.sort.column === column){
                                            $scope.sort.descending = !$scope.sort.descending;
                                          }else{
                                            $scope.sort.column = column;
                                            $scope.sort.descending = false;
                                          }
                                        };


                                        nodeService.getNodesBySubscriptionId($routeParams.subscriptionId,function(err,data) {
                                          if(err) {
                                            $scope.errorsAndMessages.push("Error getting container information");
                                          }
                                          else {
                                            if(data) {
                                              $scope.nodes.length = 0;
                                              for(var i=0;i<data.length;i++) {
                                                $scope.nodes.push({
                                                  'id' : data[i].id,
                                                  'status' : data[i].state,
                                                  'created': data[i].created,
                                                  'updated' : data[i].updated
                                                });
                                              }
                                            }
                                          }
                                        });
                                      };
                                      nodeTypeService.getAllNodeTypes(function(err,data) {
                                        if(err) {
                                          $scope.errorsAndMessages.push("Error getting node types");
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
                                      $scope.refresh();
                                    }

]);

