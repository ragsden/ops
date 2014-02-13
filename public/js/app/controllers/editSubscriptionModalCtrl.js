(function(){
  var EditSubscriptionModalController = function($scope, $modalInstance, subscriptionsService, dataToEditSubscriptionModal){

    $scope.ok = function(){
      $modalInstance.close('ok');
    };

    $scope.close = function(){
      $modalInstance.dismiss('close');
    };

    $scope.subId = dataToEditSubscriptionModal.subscriptionId;

    $scope.subscriptionUpdate = {
      "name" : null,
      "plan" : null,
      "permissions" : []
    };

    $scope.refresh = function(){
      $scope.message = "subId" + $scope.subId;

      console.log(dataToEditSubscriptionModal.subscriptionId);

    console.log('sub id passed to modal' + $scope.subId);
      $scope.selection = "default";

      subscriptionsService.getById($scope.subId, function(err, data){
        if(!err){
          $scope.subscription = data;
          console.log(data);
        }else{
          $scope.message = "Error in getting subscription data";
        }
      });
    };

    $scope.updateSubscription = function(subsciptionUpdate){
        subscriptionsService.updateSubscriptionBySubId($scope.subId, function(){});
    };

    $scope.refresh();

  };

  EditSubscriptionModalController.$inject = ["$scope", "$modalInstance", "subscriptionsService", "dataToEditSubscriptionModal"];
  angSpa.controller("editSubscriptionModalController", EditSubscriptionModalController);

})();
