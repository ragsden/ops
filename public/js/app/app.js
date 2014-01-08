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
    when('/users/:accountId',
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
    angSpa.run(['$httpProvider','$cookieStore',function($httpProvider,$cookieStore) {
      var token = $cookieStore.get(config.shippableTokenIdentifier);
      $httpProvider.defaults.headers.common['Authorization']='token ' + token;
      $http.defaults.headers.common['Content-Type']='application/json;charset=utf8';
  
    }]);
    
  $locationProvider.html5Mode(true);
});
