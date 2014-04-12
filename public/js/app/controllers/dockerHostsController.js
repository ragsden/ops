'use strict';

//sample controller


angular.module('angSpa').controller('dockerHostsController',['$scope','DockerHostService','$location',
                                    function($scope,DockerHostService,$location)
                                    {
                                      $scope.hosts = [];
                                      $scope.messages = [];

                                      $scope.showNodes = function(hostId) {
                                        $location.path('/hosts/'+hostId+'/nodes');
                                         
                                      };

                                      DockerHostService.getAll(function(err,data) {
                                        if(err) {
                                            $scope.messages.push("Error getting docker host information.");
                                        }
                                        else {
                                          if(data.length === 0) {
                                            $scope.messages.push("No hosts provisioned");
                                          }
                                          $scope.hosts = data;
                                        }
                                      });
                                    }]);
 
