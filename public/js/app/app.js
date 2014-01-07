'use strict';

// template for follow up with angular

var angSpa = angular.module('angSpa', ['ngRoute','ngCookies']);
angSpa.constant('RUN_MODE','dev');
angSpa.config(function($routeProvider, $locationProvider){
  $routeProvider.
    when('/users', {
      templateUrl: '/partials/search.html',
      controller: 'userController'
    }).
    when('/user/:accountId/subscriptions',
      {
        templateUrl: '/partials/subscriptions.html',
        controller: 'subscriptionsController'
      }).
    otherwise({
      redirectTo: '/users'
    });
  $locationProvider.html5Mode(true);
});
