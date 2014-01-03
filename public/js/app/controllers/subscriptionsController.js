
'use strict';

//sample controller


//angSpa.controller('homeController', ['$scope', '$http','App_Name', function($scope, $http,App_Name){
  //  $scope.data = 'Some data';
//}]);
angular.module('angSpa').controller('subscriptionsController',['$scope',function($scope) {
  console.log('sub controller');
  $scope.sub_data = 'Some sub - data';
}]);
