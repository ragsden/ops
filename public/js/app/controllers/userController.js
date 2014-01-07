'use strict';

var UserController = function($scope,$location,searchUser,$cookieStore) {
  $scope.githubId = "";
  $scope.users=[{
             id:"",
             identities:[{
                     provider:"",
                     userName:""
                   }]
            }];
  $scope.err="";
  $cookieStore.put('shippable-token','swati');
  $scope.token= $cookieStore.get('shippable-token');

  $scope.getUser = function()
  {
    searchUser.getUsers($scope.githubId,$scope.token,function(err,data){
    if(!err)
      {
        $scope.users = data;
      }
   else
     {
       $scope.err = err;
     }
   });
  }
};
UserController.$inject = ["$scope","$location","searchUser","$cookieStore"];
angSpa.controller("userController",UserController);
