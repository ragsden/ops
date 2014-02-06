'use strict';

//sample controller


angular.module('angSpa').controller('dockerHostsController',['$scope','DockerHostService',
                                    function($scope,DockerHostService)
                                    {
                                      console.log('ctrl.. ' + DockerHostService);
                                      $scope.hosts = [];
                                      $scope.messages = [];

                                      DockerHostService.getAll(function(err,data) {
                                        if(err) {
                                            $scope.messages.push("Error getting docker host information. " + err);
                                        }
                                        else {
                                          if(data.length === 0) {
                                            $scope.messages.push("No hosts provisioned");
                                          }
                                          $scope.hosts = data;
                                        }
                                      });
                                    }]);
 
