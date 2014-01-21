
'use strict';
angular.module('angSpa').controller('buildsController',['$scope','$routeParams','BuildsService',
	function($scope,$routeParams,buildsService) 
	{
		$scope.builds = [];
		$scope.errors = [];
			buildsService.getBuildsByProjectId($routeParams.projectId,function(err,data) {
				if(err) {
					$scope.errors.push('Error getting builds information..' + err + ',' + data);
				}
				else {
					if(data.length === 0)
					{
						$scope.errors.push('There are no builds in this project');
					} 
					else {
						for(var i=0;i<data.length;i++) {
							$scope.builds.push({
								buildNumber : data[i].buildNumber,
								phase : data[i].phase,
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
	}]);