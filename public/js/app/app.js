'use strict';

// template for follow up with angular

var angSpa = angular.module('angSpa', ['ngRoute','ngCookies']);
angSpa.constant('App_Name','Ops Dashboard');
angSpa.config(function($httpProvider,$routeProvider, $locationProvider){
  
  $httpProvider.interceptors.push(['$q', function($q) {
  return {  
    request: function(config) { return config || $q.when(config); },
    requestError: function(rejection) { return $q.reject(rejection); },
    response: function(response) { return response || $q.when(response); },
    responseError: function(rejection) {  return $q.reject(rejection); }
    }
  }]); 
   
  $routeProvider.when('/accounts', { templateUrl: '/partials/search.html', controller: 'accountsController'}).
    when('/accounts/:accountId/subscriptions', { templateUrl: '/partials/subscriptions.html', controller: 'subscriptionsController'}).
    when('/subscriptions/:subscriptionId/containers', { controller: 'containerController', templateUrl: '/partials/containers.html'}).
    otherwise({ redirectTo: '/accounts' });

  $locationProvider.html5Mode(true);
  }).factory('Auth',['$cookieStore',function ($cookieStore) {
      var _shippableMiddwareAPIToken = { };
      return {
          shippableMiddwareAPIToken : _shippableMiddwareAPIToken,
          get : function() {
            _shippableMiddwareAPIToken =  $cookieStore.get(config.shippableTokenIdentifier);
            return _shippableMiddwareAPIToken;
          } 
        }
      }])

  .run(['Auth','$http',function(Auth,$http) {
      $http.defaults.headers.common['Authorization']='token ' + Auth.get();
      $http.defaults.headers.common['Content-Type']='application/json;charset=utf8';
    }]);
  
