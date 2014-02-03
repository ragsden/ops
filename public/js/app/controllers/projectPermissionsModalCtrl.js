(function(){
   var ProjectPermissionsModalController = function($scope, $modalInstance){

      $scope.cancel = function(){
        $modalInstance.dismiss('cancel');
      };

};

   ProjectPermissionsModalController.$inject = ["$scope", "$modalInstance"];
   angSpa.controller("projectPermissionsModalController", ProjectPermissionsModalController);

})();
