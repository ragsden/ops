/*jshint-W079 */
/*jshint -W069 */
'use strict';

// template for follow up with angular

var angSpa = angular.module('angSpa', ['ngRoute','ngCookies', 'ui.bootstrap']);
angSpa.config(function($httpProvider,$routeProvider, $locationProvider){

  $httpProvider.interceptors.push(['$q', function($q) {
    return {
      request: function(config) { return config || $q.when(config); },
      requestError: function(rejection) { return $q.reject(rejection); },
      response: function(response) { return response || $q.when(response); },
      responseError: function(rejection) {  return $q.reject(rejection); }
    };
  }]);

  $routeProvider.when('/accounts', { templateUrl: '/partials/accountsSearch.html', controller: 'accountsSearchController'}).
    when('/accounts/search/:loginId', { templateUrl: '/partials/accounts.html', controller: 'accountsController'}).
    when('/accounts/:accountId',{templateUrl: '/partials/account.html', controller: 'accountController'}).
    when('/accounts/:accountId/subscriptions', { templateUrl: '/partials/subscriptions.html', controller: 'subscriptionsController'}).
    when('/subscriptions/:subscriptionId/nodes', { controller: 'nodesController', templateUrl: '/partials/nodes.html'}).
    when('/subscriptions/:subscriptionId/projects', { controller: 'projectsController', templateUrl: '/partials/projects.html'}).
    when('/projects/:projectId/builds',{ controller : 'buildsController', templateUrl : '/partials/builds.html' }).
    when('/projects/:projectId/builds/:buildNumber',{ controller : 'buildController', templateUrl : '/partials/build.html' }).
    when('/cards/:cardId',{ controller : 'cardsController', templateUrl : '/partials/card.html' }).
    when('/', { redirectTo: '/'}).
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
  };
}])
.run(['Auth','$http','$rootScope','$location',function(Auth,$http,$rootScope,$location) {
  var token = Auth.get();
  $rootScope.$on("$routeChangeStart", function (event, next, current) {
    if(!token) {
      $location.url('/');
      window.location.reload();
    }
    else {
      if(next.originalPath === '/' && next.redirectTo === '/') {
        next.redirectTo = '/accounts';
      }
    }
  });

  $http.defaults.headers.common['Authorization']='token ' + token;
  $http.defaults.headers.common['Content-Type']='application/json;charset=utf8';
}]);

