/*jshint -W083 */
/*jshint -W030 */

'use strict';
angular.module('angSpa').controller('buildsController',['$scope','$routeParams','$location','BuildsService','$filter','$q', '$modal',
                                    function($scope,$routeParams,$location,buildsService,$filter,$q, $modal){
                                      $scope.builds = [];
                                      $scope.errorsAndMessages = [];

                                      $scope.status = "";
                                      $scope.buildPhasesObj = {
                                        'unknown': 'unknown',
                                        'queued' : 'queued',
                                        'started' : 'started',
                                        'synchronizing' : 'synchronizing',
                                        'building' : 'building',
                                        'archiving' : 'archiving',
                                        'archived' : 'archived',
                                        'finished' : 'finished',
                                        'all' : ''
                                      };
                                      $scope.projectId = $routeParams.projectId;
                                      $scope.disable_runButton = false;
                                      $scope.buildPhases =  Object.keys($scope.buildPhasesObj).splice(0,8);
                                      $scope.selectedBuildPhase = '';

                                      $scope.selectedBuildNumbers=[];
                                      $scope.$watch('builds|filter:{isSelected:true}|filter:{phase: selectedBuildPhase}',function(nv) {
                                        $scope.selectedBuildNumbers = nv.map(function(build) {
                                          return build.buildNumber;
                                        });
                                      },true);

                                      $scope.masterToggle = false;

                                      $scope.selectAllBuilds = function(){
                                        $scope.masterToggle=!$scope.masterToggle;
                                        for(var i=0;i<$scope.builds.length;i++) {
                                          if($scope.builds[i].phase === $scope.selectedBuildPhase){
                                            $scope.builds[i].isSelected = $scope.masterToggle;
                                          }else if($scope.selectedBuildPhase === ""){
                                            $scope.builds[i].isSelected = $scope.masterToggle;
                                          }
                                        }
                                      };
                                      
                                      

                                      $scope.deleteSelectedBuilds = function() {
                                        $scope.modalInstance = $modal.open({
                                            templateUrl : '/templates/commonModal.html',
                                            controller : 'commonModalController',
                                            resolve: {
                                               dataToCommonModal : function(){
                                                return { header : "Delete builds",
                                                  body : "Click Yes to delete builds: ",
                                                  data : $scope.selectedBuildNumbers };
                                               }
                                            }
                                        });

                                        $scope.modalInstance.result.then(function(confirmYes){
                                            for(var i=0;i<$scope.selectedBuildNumbers.length;i++) {
                                              $scope.deleteBuild($scope.selectedBuildNumbers[i],true);
                                            }
                                            $scope.selectedBuildNumbers.length = 0;
                                            $scope.masterToggle = false;
                                        }, function(confirmCancel){});
                                      };

                                      $scope.getBuildDetails = function(buildNumber){
                                        $location.path("/projects/"+$routeParams.projectId+"/builds/"+buildNumber);
                                      };
                                      $scope.sort = {column:'buildNumber', descending: false};

                                      $scope.init = function(){

                                        $scope.changeSorting = function(column){
                                          if($scope.sort.column === column){
                                            $scope.sort.descending = !$scope.sort.descending;
                                          }else{
                                            $scope.sort.column = column;
                                            $scope.sort.descending = false;
                                          }
                                        };

                                        $scope.toggleSelection = function(build) {
                                          build.isSelected = !build.isSelected;
                                        };

                                        $scope.selectedBuildPhase = '';
                                        buildsService.getBuildsByProjectId($routeParams.projectId,function(err,data) {
                                          if(err) {
                                            $scope.errorsAndMessages.push('Error getting builds information..' + err + ',' + data);
                                          }
                                          else {
                                            $scope.builds.length = 0;
                                            if(data.length === 0)
                                              {
                                                var found = $filter('find_msg')('There are no builds in this project',$scope.errorsAndMessages);
                                                if(!found)
                                                  {
                                                    $scope.errorsAndMessages.push('There are no builds in this project');
                                                  }
                                                  $scope.masterToggle = false;
                                              }
                                              else {
                                                $filter('delete_msg')('There are no builds in this project',$scope.errorsAndMessages);
                                                for(var i=0;i<data.length;i++) {
                                                  var buildObj = {
                                                    buildNumber : data[i].buildNumber,
                                                    phase : $scope.buildPhases[data[i].phase],
                                                    status : data[i].status,
                                                    duration : data[i].duration,
                                                    commitSha : data[i].commitSha,
                                                    commitUrl : data[i].commitUrl,
                                                    lastAuthorEmail: data[i].lastAuthorEmail,
                                                    triggeredByAccount : data[i].triggeredByAccount,
                                                    runTime : data[i].runtime,
                                                    language: data[i].language,
                                                    isSelected: false
                                                  };


                                                  $scope.builds.push(buildObj);
                                                }
                                              }
                                          }
                                        });
                                      };

                                      $scope.deleteBuild = function(buildNumber,shouldRefresh){
                                        $scope.status = "";
                                        buildsService.deleteBuildByBuildNumber($routeParams.projectId,buildNumber,
                                                                               function(status, data){
                                                                                 if(status === 200){
                                                                                   $scope.errorsAndMessages.push("Build " + buildNumber + " has been deleted") ;
                                                                                 }
                                                                                 else
                                                                                   {
                                                                                     $scope.errorsAndMessages.push('Error deleting the build..');
                                                                                   }
                                                                                   if(shouldRefresh) {
                                                                                     $scope.init();
                                                                                   }
                                                                               });

                                      };

                                      $scope.runBuild = function(shouldRefresh){
                                        $scope.disable_runButton = true;
                                        buildsService.runBuildByProjectId($routeParams.projectId,function(status, data){
                                          if(status === 200){
                                            $scope.errorsAndMessages.push("Build " + data.buildNumbers + " has been triggered!!") ;
                                          }
                                          else
                                            {
                                              var msg = 'Error running the build..' + status + ',' + data;
                                              var found = $filter('find_msg')(msg,$scope.errorsAndMessages);
                                              if(!found)
                                                {
                                                  $scope.errorsAndMessages.push(msg);
                                                }
                                            }
                                            if(shouldRefresh)
                                              {
                                                $scope.init();
                                              }
                                              $scope.disable_runButton = false;
                                        });

                                      };

                                      $scope.init();

                                    }]);
