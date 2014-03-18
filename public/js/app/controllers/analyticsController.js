'use strict';

angular.module('angSpa').controller('analyticsController',['$scope','AnalyticsService',
	function($scope,AnalyticsService)
	{
		console.log('loaded');
		$scope.totalUsers = '';
		$scope.lastRunTime = '';
		AnalyticsService.getSystemAnalytics(function(status,data) {
			$scope.lastRunTime = data.lastRun;
			$scope.totalUsers = data.totalUsers;
		});

	}]);