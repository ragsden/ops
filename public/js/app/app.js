'use strict';

angular.module('angSpa', []).
config(function($routeProvider, $locationProvider){
  $routeProvider.
    when('/view1', {
      templateUrl: 'partials/view1',
      controller: 'homeController'
    }).
    otherwise({
      redirectTo: '/view0'
    });
  
  $locationProvider.html5Mode(true);
});
