'use strict';

var HomeController = function($scope,$location,searchUser,$cookieStore) {
  $scope.accountId = '1234';
  $scope.username = "";
 
  $cookieStore.put('shippable-token','swati');
  $scope.cookieVal= $cookieStore.get('shippable-token');

  $scope.getUser = function()
  {
    //  $location.search('id', 123);
    searchUser.getUsers($scope.username,$scope.cookieVal,function(err,data){
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
HomeController.$inject = ["$scope","$location","searchUser","$cookieStore"];
angSpa.controller("homeController",HomeController);
