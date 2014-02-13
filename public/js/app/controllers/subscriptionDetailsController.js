'use strict';
angular.module('angSpa').controller('subscriptionDetailsController',
                                    ['$scope','$modal','$routeParams','subscriptionsService','plansService','ProjectsService','$q',
                                      function($scope,$modal,$routeParams,subscriptionsService,plansService,ProjectsService,$q) {
                                        $scope.subscription = { };
                                        $scope.messages = [];
                                        $scope.openModal = function(subId){
                                          $scope.modalInstance = $modal.open({
                                            //templateUrl should be the path assuming public as the root.
                                            templateUrl: '/templates/deleteSubscriptionModal.html',
                                            controller: 'simpleModalController',
                                          });

                                          $scope.modalInstance.result.then(
                                            function(okString){
                                            $scope.deleteBuilds(subId, function(err){
                                              if(!err)
                                                {
                                                  $scope.deleteProjects(subId, function(err){
                                                    if(!err)
                                                      {
                                                        $scope.deleteSubscription(subId);
                                                      }
                                                      else
                                                        {
                                                          $scope.messages.push("Error in deleting subscription");
                                                        }
                                                  });
                                                }
                                                else
                                                  {
                                                    $scope.messages.push("Error in deleting subscription");
                                                  }
                                            });
                                          }, function(cancelString) {
                                          });
                                        };
                                        $scope.deleteBuilds = function(subId, done){
                                          ProjectsService.getProjectsBySubscriptionId(subId, function(err, projectsData){
                                            if(err){
                                              done(err);
                                            }
                                            else
                                              {
                                                if(projectsData.length === 0){
                                                  done(null);
                                                }
                                                else
                                                  {
                                                    var deferred = $q.defer();
                                                    var promises = [];

                                                    projectsData.forEach(function(obj) {
                                                      var prom = ProjectsService.deleteBuildsByProjectId(obj.id);
                                                      promises.push(prom);
                                                    });

                                                    $q.all(promises).then(function success(data){
                                                      done(null);
                                                    },function failure(err)
                                                    {
                                                      done(err);
                                                    });
                                                  }
                                              }
                                          });
                                        };
                                        $scope.deleteProjects = function(subId,done){
                                          subscriptionsService.deleteProjectsBySubId(subId, function(status, data){
                                            if(status === 200){
                                              done(null);
                                            }
                                            else{
                                              done(data);
                                            }
                                          });
                                        };
                                        $scope.deleteSubscription = function(subId){
                                          subscriptionsService.deleteSubscriptionBySubId(subId, function(status, data){
                                            if(status === 200){
                                              $scope.init();
                                            }else{
                                              $scope.subscriptionsModel.errors.push("Error in deleting subscription:" + data);
                                            }
                                          });
                                        };

                                        function refresh() {
                                          subscriptionsService.getById($routeParams.subscriptionId,function(err,subscriptionData) {
                                            if(err) {
                                              $scope.messages.push("Error getting subscription information");
                                            }
                                            else {
                                              plansService.getPlanByPlanId(subscriptionData.plan, function(errP, planData){
                                                if(!errP){
                                                  var percent_storageBytesUsed = ((subscriptionData.storageBytesUsed/(planData.storageGigaBytesQuota * 1073741824))*100).toFixed(2);
                                                  $scope.subscription = {
                                                    "id" : subscriptionData.id,
                                                    "name" : subscriptionData.name,
                                                    "storageUsed" : percent_storageBytesUsed,
                                                    "privateProjectsUsed": subscriptionData.privateProjectsCount,
                                                    "privateProjectsQuota" : planData.privateProjectsQuota,
                                                    "nodesUsed" : subscriptionData.nodes.length,
                                                    "nodesQuota" : planData.nodesQuota
                                                  };
                                                }else{
                                                  $scope.messages.push("Error getting plan information");
                                                }

                                              });

                                            }

                                          });
                                        }

                                        refresh();
                                      }]);
