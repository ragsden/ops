'use strict';

// template for follow up with angular

var angSpa = angular.module('angSpa', ['ngRoute','ngCookies']);
angSpa.config(function($routeProvider, $locationProvider){
  $routeProvider.
    when('/accounts', {
      templateUrl: '/partials/search.html',
      controller: 'accountsController'
    }).
    when('/accounts/:accountId/subscriptions',
      {
        templateUrl: '/partials/subscriptions.html',
        controller: 'subscriptionsController'
      }).
    when('/subscriptions/:subscriptionId/containers',
      { controller: 'containerController',
        templateUrl: '/partials/containers.html'
      }).
    otherwise({
      redirectTo: '/accounts'
    });
    
  $locationProvider.html5Mode(true);
});
