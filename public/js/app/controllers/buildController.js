var BuildController = function($scope,$routeParams,BuildsService) {
  $scope.buildModel={
    console:[{ output : "" }],
    err : "",
  };
$scope.init = function(){
BuildsService.getConsoleByBuildNo($routeParams.projectId,$routeParams.buildNumber,function(err,data){
    if(err)
      {
        $scope.buildModel.err = 'Error getting the Console Output.';
      }
      else
      {
		$scope.buildModel.console = data;
      }

  });
};
$scope.init();


};
BuildController.$inject = ["$scope","$routeParams","BuildsService"];
angSpa.controller("buildController",BuildController);