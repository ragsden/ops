'use strict';

var AccountsSearchController = function($scope,$location) {
  $scope.accountsSearchModel={
    loginId:"",
    err:"",
  };
  $scope.searchAccounts = function()
  {
    $location.path("/accounts/search/"+$scope.accountsSearchModel.loginId);
  };

  $scope.goBack = function(){
    window.history.back();
  };

  $scope.goForward = function(){
    window.history.forward();
  };


};
AccountsSearchController.$inject = ["$scope","$location"];
angSpa.controller("accountsSearchController",AccountsSearchController);

