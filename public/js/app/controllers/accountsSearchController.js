'use strict';

var AccountsSearchController = function($scope,$location,searchAccountsByUsername) {
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
      if(err === 401) {
                $scope.accountsSearchModel.err = 'You are not allowed to use this feature.';
      }
      else {
       $scope.accountsSearchModel.accounts = data;
       if(data.length==0) 
       {
        $scope.accountsSearchModel.err = 'This user does not exist'
       }
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
AccountsSearchController.$inject = ["$scope","$location","searchAccountsByUsername"];
angSpa.controller("accountsSearchController",AccountsSearchController);

