
'use strict';

var SubscriptionsController = function($scope,getAccountById,$cookieStore,$routeParams){
  $scope.subscriptionsModel = {
    userId : "",
    userName : "",
    provider : "",
    subscriptions:[{
     }],
  };
  
  var token = $cookieStore.get(config.shippableTokenIdentifier);
  $scope.init = function(){
    getAccountById.getAccount($routeParams.accountId,token,function(err,data){
     if(!err)
     {
       $scope.subscriptionsModel.userId = data.id;
       $scope.subscriptionsModel.userName = data.identities[0].userName;
       $scope.subscriptionsModel.provider = data.identities[0].provider;
     }
     else
      {
        $scope.err = err;
      }
    });
  };

$scope.init();
};
SubscriptionsController.$inject = ["$scope","getAccountById","$cookieStore","$routeParams"];
angSpa.controller("subscriptionsController",SubscriptionsController);








