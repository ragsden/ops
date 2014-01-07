
'use strict';

var SubscriptionsController = function($scope,getUserProfile,$cookieStore,$routeParams){
  $scope.accountId='';
  $scope.subscriptionsModel = [{
    userId : "",
    userName : "",
    provider : "",
  }];

  $scope.accountId = $routeParams.accountId;
  var token = $cookieStore.get(config.shippableTokenIdentifier);
  $scope.init = function(){
    getUserProfile.getProfile($scope.accountId,token,function(err,data){
     if(!err)
     {
       $scope.subscriptionsModel[0].userId = data.id;
       $scope.subscriptionsModel[0].userName = data.identities[0].userName;
       $scope.subscriptionsModel[0].provider = data.identities[0].provider;
     }
     else
      {
        $scope.err = err;
      }
    });
  };

$scope.init();
};
SubscriptionsController.$inject = ["$scope","getUserProfile","$cookieStore","$routeParams"];
angSpa.controller("subscriptionsController",SubscriptionsController);









