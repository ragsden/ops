(function(){
  var EditSubscriptionModalController = function($scope, $modalInstance, subscriptionsService, dataToEditSubscriptionModal){

    $scope.close = function(){
      $modalInstance.dismiss('close');
    };

    $scope.subId = dataToEditSubscriptionModal.subscriptionId;

    function subscriptionUpdateObj(name, plan, cardId, permissions){
        this.name = name;
        this.plan = plan;
        this.cardId = cardId;
        this.permissions = permissions;
    }

    $scope.refresh = function(){

    subscriptionsService.getById($scope.subId, function(err, data){
        if(!err){
          $scope.subscription = data;
          console.log(data);
        }else{
          $scope.message = "Error in getting subscription data";
        }
      });
    };

    $scope.updateSubscription = function(){

      $scope.message = "";
      $scope.subscriptionUpdate = new subscriptionUpdateObj($scope.subscription.name, $scope.subscription.plan,
                                                            $scope.subscription.cardId, $scope.subscription.permissions);

      subscriptionsService.updateSubscriptionBySubId($scope.subId, $scope.subscriptionUpdate, function(status, data){
        if(status === 200){
         $scope.message = "subscription updated.";
         $scope.refresh();
        }else{
         $scope.message = "Error in updating the subscription";
        }
      });
    };

    $scope.refresh();

  };

  EditSubscriptionModalController.$inject = ["$scope", "$modalInstance", "subscriptionsService", "dataToEditSubscriptionModal"];
  angSpa.controller("editSubscriptionModalController", EditSubscriptionModalController);

})();


