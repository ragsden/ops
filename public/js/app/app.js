'use strict';

// template for follow up with angular

var angSpa = angular.module('angSpa', ['ngRoute']);
angSpa.constant('App_Name','Ops Dashboard');
angSpa.config(function($routeProvider, $locationProvider){
  $routeProvider.
    when('/', {
      templateUrl: '/partials/users.html',
      controller: 'homeController'
    }).
    when('/users/:accountId',
      {
        templateUrl: '/partials/subscriptions.html',
        controller: 'subscriptionsController'
      }).
    otherwise({
      redirectTo: '/'
    });
  $locationProvider.html5Mode(true);
});
