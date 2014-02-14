(function(){
   var CommonModalController = function($scope, $modalInstance, dataToCommonModal){

     $scope.header = dataToCommonModal.header;
     $scope.body = dataToCommonModal.body;
     $scope.data = dataToCommonModal.data;

      $scope.ok = function(){
        $modalInstance.close('ok');
      };

      $scope.cancel = function(){
        $modalInstance.dismiss('cancel');
      };

};

   CommonModalController.$inject = ["$scope", "$modalInstance", "dataToCommonModal"];
   angSpa.controller("commonModalController", CommonModalController);

})();
