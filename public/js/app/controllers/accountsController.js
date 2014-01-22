'use strict';

var AccountsController = function($scope,$routeParams,$location,AccountsService) {
  $scope.accountsModel={
             accounts:[{  id:"",
                          identities:[{
                                 provider:"",
                                 userName:""
                               }]
                      }],
             err: ""
            };
  
    AccountsService.searchAccountsByUsername($routeParams.loginId,function(err,data){
      if(err) {
                $scope.accountsModel.err = 'Error getting accounts with this loginId!!';
      }
      else {
       $scope.accountsModel.accounts = data;
       if(data.length === 0) 
       {
        $scope.accountsModel.err = 'This user does not exist'
       }
      }
   });
  
  $scope.getAccountById= function(accountId)
  {
  $location.path("/accounts/"+accountId);
  }
  $scope.getSubscriptions = function(accountId)
  {
  $location.path("/accounts/"+accountId+"/subscriptions");
  }
  };
AccountsController.$inject = ["$scope","$routeParams","$location","AccountsService"];
angSpa.controller("accountsController",AccountsController);

