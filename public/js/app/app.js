'use strict';

// template for follow up with angular

var angSpa = angular.module('angSpa', ['ngRoute','ngCookies']);
angSpa.constant('App_Name','Ops Dashboard');
angSpa.config(function($routeProvider, $locationProvider){
  $routeProvider.
    when('/', {
      templateUrl: '/partials/search.html',
      controller: 'homeController'
    }).
    when('/user/:accountId/subscriptions',
      {
        templateUrl: '/partials/subscriptions.html',
        controller: 'subscriptionsController'
      }).
    otherwise({
      redirectTo: '/'
    });
  $locationProvider.html5Mode(true);
});
