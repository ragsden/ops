'use strict';

//sample controller


//angSpa.controller('homeController', ['$scope', '$http','App_Name', function($scope, $http,App_Name){
  //  $scope.data = 'Some data';
//}]);
angular.module('angSpa').controller('homeController',['$scope',function($scope) {
  $scope.data = 'Some data';
  $scope.accountId = '1234';
}]);
