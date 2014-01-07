'use strict';

var AccountsController = function($scope,$location,searchAccountsByUsername,$cookieStore) {
  $scope.accountsModel={
             accounts:[{  id:"",
                          identities:[{
                                 provider:"",
                                 userName:""
                               }]
                      }],
             githubId:"",
            };
  $scope.err="";
  var token = $cookieStore.get(config.shippableTokenIdentifier);
  $scope.getAccount = function()
  {
    searchAccountsByUsername.searchAccounts($scope.accountsModel.githubId,token,function(err,data){
    if(!err)
      {
        $scope.accountsModel.accounts = data;
      }
   else
     {
       $scope.err = err;
     }
   });
  }
  $scope.getSubscriptions = function(accountId)
  {
  $location.path("/accounts/"+accountId+"/subscriptions");
  }
};
AccountsController.$inject = ["$scope","$location","searchAccountsByUsername","$cookieStore"];
angSpa.controller("accountsController",AccountsController);
