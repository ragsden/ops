(function(){
   var SimpleModalController = function($scope, $modalInstance){
      $scope.confirmAnswer = false;

      $scope.ok = function(){
        $scope.confirmAnswer = true;
        $modalInstance.close($scope.confirmAnswer);
      };

      $scope.cancel = function(){
        $modalInstance.dismiss('cancel');
      };

};

   SimpleModalController.$inject = ["$scope", "$modalInstance"];
   angSpa.controller("simpleModalController", SimpleModalController);

})();
