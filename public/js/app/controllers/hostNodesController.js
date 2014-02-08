angular.module('angSpa').controller('hostNodesController',['$scope','DockerHostService','$routeParams',function($scope,DockerHostService,$routeParams) {
  $scope.nodes = [];
  $scope.messages = [];
  DockerHostService.getNodesByHostId($routeParams.hostId,function(err,data) {
        if(err) {
          $scope.messages.push('Error getting node inforamtion for host ' + err);
        }
        else {
         if(data.length === 0 ) {
           $scope.messages.push('No nodes found for this host');
         }
         $scope.nodes = data;
        }
  });
                                    
}]);

