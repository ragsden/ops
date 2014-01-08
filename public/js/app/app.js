'use strict';

// template for follow up with angular

var angSpa = angular.module('angSpa', ['ngRoute','ngCookies']);
angSpa.constant('App_Name','Ops Dashboard');
angSpa.config(function($routeProvider, $locationProvider){
  $routeProvider.
    when('/', {
      templateUrl: '/partials/users.html',
      controller: 'homeController'
    }).
    when('/users/:accountId/subscriptions',
      {
        templateUrl: '/partials/subscriptions.html',
        controller: 'subscriptionsController'
      }).
    when('/subscriptions/:subscriptionId/containers',
      { controller: 'containerController',
        templateUrl: '/partials/containers.html'
      }).
    otherwise({
      redirectTo: '/'
    });
    
  $locationProvider.html5Mode(true);
});
