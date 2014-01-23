
'use strict';
angular.module('angSpa').controller('buildsController',['$scope','$routeParams','BuildsService',
	function($scope,$routeParams,buildsService) 
	{
		$scope.builds = [];
		$scope.errors = [];
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
        $scope.init = function(){        	
        $scope.selectedBuildPhase = '';
			buildsService.getBuildsByProjectId($routeParams.projectId,function(err,data) {
				if(err) {
					$scope.errors.push('Error getting builds information..' + err + ',' + data);
				}
				else {
					$scope.builds.length = 0;
					if(data.length === 0)
					{
						$scope.errors.push('There are no builds in this project');
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
			$scope.deleteBuild = function(buildNumber){
				$scope.status = "";
				buildsService.deleteBuildByBuildNumber($routeParams.projectId,buildNumber, function(status, data){
      			if(status === 200){
        			$scope.status = "Build " + buildNumber + " has been deleted" ;
        			$scope.init();
      			}
     			 else
      			{
       				 $scope.errors.push('Error deleting the build..' + err + ',' + data);
      			}
   			 });

			};
			$scope.init();

	}]);
