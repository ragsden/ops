
'use strict';
angular.module('angSpa').controller('buildsController',['$scope','$routeParams','BuildsService',
	function($scope,$routeParams,buildsService) 
	{
		$scope.builds = [];
		$scope.errorsAndMessages = [];
		$scope.sort = { column : 'buildNumber', descending: false };

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
        $scope.buildPhases =  Object.keys($scope.buildPhasesObj).splice(0,8);
        $scope.selectedBuildPhase = '';

        $scope.selectedBuildNumbers=[];
        $scope.$watch('builds|filter:{isSelected:true}',function(nv) {
          $scope.selectedBuildNumbers = nv.map(function(build) {
            return build.buildNumber;
          });
        },true);
        $scope.masterToggle = false;
        $scope.selectAllBuilds = function() {

          for(var i=0;i<$scope.builds.length;i++) {
            $scope.builds[i].isSelected = $scope.masterToggle;
          }
        }

        $scope.deleteSelectedBuilds = function() {
          console.log($scope.selectedBuildNumbers);
          for(var i=0;i<$scope.selectedBuildNumbers.length;i++) {
            $scope.deleteBuild($scope.selectedBuildNumbers[i],false);
          }
          $scope.deleteSelectedBuilds=[]; //reset 
          $scope.init();
        }
        $scope.init = function(){        	
        $scope.selectedBuildPhase = '';
			buildsService.getBuildsByProjectId($routeParams.projectId,function(err,data) {
				if(err) {
					$scope.errorsAndMessages.push('Error getting builds information..' + err + ',' + data);
				}
				else {
					$scope.builds.length = 0;
					if(data.length === 0)
					{
						$scope.errorsAndMessages.push('There are no builds in this project');
                        $scope.masterToggle = false;
					} 
					else {
						for(var i=0;i<data.length;i++) {
							$scope.builds.push({
								buildNumber : data[i].buildNumber,
								phase : $scope.buildPhases[data[i].phase],
								status : data[i].status,
								duration : data[i].duration,
								commitSha : data[i].commitSha,
								commitUrl : data[i].commitUrl,
								lastAuthorEmail: data[i].lastAuthorEmail,
								triggeredByAccount : data[i].triggeredByAccount
							});
						}
					}
				}
			});
		}
			$scope.deleteBuild = function(buildNumber,shouldRefresh){
              $scope.status = "";
              buildsService.deleteBuildByBuildNumber($routeParams.projectId,buildNumber, 
                                                     function(status, data){
                if(status === 200){
                  $scope.errorsAndMessages.push("Build " + buildNumber + " has been deleted") ;
                }
                else
                  {
                    $scope.errorsAndMessages.push('Error deleting the build..' + err + ',' + data);
                  }
                  if(shouldRefresh) {
                    $scope.init();
                  }
              });

			};
			$scope.init();

	}]);
