
'use strict';

var SubscriptionsController = function($scope,getUserProfile,$cookieStore,$routeParams){
  $scope.accountId = $routeParams.accountId;
  var token = $cookieStore.get(config.shippableTokenIdentifier);
  $scope.init = function(){
    getUserProfile.getProfile($scope.accountId,$scope.token,function(err,data){
     if(!err)
     {
       $scope.result = data;
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









