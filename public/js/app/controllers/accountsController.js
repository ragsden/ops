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
      if(err === 401) {
                $scope.accountsModel.err = 'You are not allowed to use this feature.';
      }
      else {
       $scope.accountsModel.accounts = data;
       if(data.length==0) 
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

