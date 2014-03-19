'use strict';

angular.module('angSpa').controller('analyticsController',['$scope','AnalyticsService','$filter',
	function($scope,AnalyticsService,$filter)
	{
		console.log('loaded');
		$scope.totalUsers = '';
		$scope.lastRunTime = '';
		$scope.startDate = '';
		$scope.endDate = '';
		$scope.newUserData= [];
		$scope.getNewRegisteredUsers = function() {
			var filteredStartDate = $filter('date')($scope.startDate,'yyyy-MM-dd');
			var filteredEndDate = $filter('date')($scope.endDate,'yyyy-MM-dd')
			console.log(filteredStartDate+","+filteredEndDate);
			AnalyticsService.getNewAccountData(filteredStartDate,filteredEndDate,function(status,data) {
				console.log(status);
				console.log(data);
				$scope.newUserData = data;
			});
		};
		$scope.today = function() {
			$scope.dt = new Date();
		};
		$scope.today();

		$scope.showWeeks = true;
		$scope.toggleWeeks = function () {
			$scope.showWeeks = ! $scope.showWeeks;
		};

		$scope.clear = function () {
			$scope.dt = null;
		};

	  // Disable weekend selection
	  $scope.disabled = function(date, mode) {
	  	return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
	  };

	  $scope.toggleMin = function() {
	  	$scope.minDate = ( $scope.minDate ) ? null : new Date();
	  };
	  $scope.toggleMin();

	  $scope.open = function(sc,$event) {
	  	$event.preventDefault();
	  	$event.stopPropagation();
	  	if(sc === 'openedStartDate') {
	  		$scope.openedStartDate = true;
	  	}
	  	if(sc === 'openedEndDate') {
	  		$scope.openedEndDate = true;
	  	}
	  };

	  $scope.dateOptions = {
	  	'year-format': "'yy'",
	  	'starting-day': 1
	  };

	  AnalyticsService.getSystemAnalytics(function(status,data) {
	  	$scope.lastRunTime = data.lastRun;
	  	$scope.totalUsers = data.totalUsers;
	  });

}]);