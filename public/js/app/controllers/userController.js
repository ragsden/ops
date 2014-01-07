'use strict';

var UserController = function($scope,$location,searchUser,$cookieStore) {
  $scope.accountId = '1234';
  $scope.githubId = "";
 
  $cookieStore.put('shippable-token','swati');
  $scope.token= $cookieStore.get('shippable-token');

  $scope.getUser = function()
  {
    //  $location.search('id', 123);
    searchUser.getUsers($scope.githubId,$scope.token,function(err,data){
    if(!err)
      {
        $scope.result = data;
      }
     // $location.path('/search/'+ $scope.accountId);
   else
     {
       $scope.err = err;
     }
   });
  }
};
UserController.$inject = ["$scope","$location","searchUser","$cookieStore"];
angSpa.controller("userController",UserController);
