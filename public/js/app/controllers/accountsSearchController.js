'use strict';

var AccountsSearchController = function($scope,$location) {
  $scope.accountsSearchModel={            
             loginId:"", 
             err:"",            
            };
  $scope.searchAccounts = function()
  {
    $location.path("/accounts/search/"+$scope.accountsSearchModel.loginId);
   }
 };
AccountsSearchController.$inject = ["$scope","$location"];
angSpa.controller("accountsSearchController",AccountsSearchController);

