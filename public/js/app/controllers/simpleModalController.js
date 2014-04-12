(function(){
   var SimpleModalController = function($scope, $modalInstance){

      $scope.ok = function(){
        $modalInstance.close('ok');
      };

      $scope.cancel = function(){
        $modalInstance.dismiss('cancel');
      };

};

   SimpleModalController.$inject = ["$scope", "$modalInstance"];
   angSpa.controller("simpleModalController", SimpleModalController);

})();
