'use strict';

var AccountsController = function($scope,$location,searchAccountsByUsername,$cookieStore) {
  $scope.githubId = "";
  $scope.accounts=[{
             id:"",
             identities:[{
                     provider:"",
                     userName:""
                   }]
            }];
  $scope.err="";
  var token = $cookieStore.get(config.shippableTokenIdentifier);
  $scope.getAccount = function()
  {
    searchAccountsByUsername.searchAccounts($scope.githubId,token,function(err,data){
    if(!err)
      {
        $scope.accounts = data;
      }
   else
     {
       $scope.err = err;
     }
   });
  }
};
AccountsController.$inject = ["$scope","$location","searchAccountsByUsername","$cookieStore"];
angSpa.controller("accountsController",AccountsController);
