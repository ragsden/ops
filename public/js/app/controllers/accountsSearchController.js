'use strict';

var AccountsSearchController = function($scope,$location,searchAccountsByUsername,$cookieStore) {
  $scope.accountsSearchModel={
             accounts:[{  id:"",
                          identities:[{
                                 provider:"",
                                 userName:""
                               }]
                      }],
             loginId:"",
             err: ""
            };
  var token = $cookieStore.get(config.shippableTokenIdentifier);
  $scope.getAccount = function()
  {
    searchAccountsByUsername.searchAccounts($scope.accountsSearchModel.loginId,token,function(err,data){
    if(!err)
      {
        $scope.accountsSearchModel.accounts = data;
      }
   else
     {
       $scope.accountsSearchModel.err = err;
     }
   });
  }
  $scope.getAccountById= function(accountId)
  {
  $location.path("/accounts/"+accountId);
  }
  $scope.getSubscriptions = function(accountId)
  {
  $location.path("/accounts/"+accountId+"/subscriptions");
  }
};
AccountsSearchController.$inject = ["$scope","$location","searchAccountsByUsername","$cookieStore"];
angSpa.controller("accountsSearchController",AccountsSearchController);
