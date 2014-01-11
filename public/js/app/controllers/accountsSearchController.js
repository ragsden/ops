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
  $scope.getAccount = function()
  {
    searchAccountsByUsername.searchAccounts($scope.accountsSearchModel.loginId,function(err,data){
      console.log(err);
      if(err === 401) {
                $scope.accountsSearchModel.err = 'You are not allowed to use this feature.';
      }
      else if(err === 404) {
                $scope.accountsSearchModel.err = 'The requested user was not found';
      }
      else if (!err) {
       $scope.accountsSearchModel.accounts = data; 
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
