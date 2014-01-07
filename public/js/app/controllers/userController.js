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
  var token = $cookieStore.get(config.shippableTokenIdentifier);
  $scope.getUser = function()
  {
    searchUser.getUsers($scope.githubId,token,function(err,data){
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
