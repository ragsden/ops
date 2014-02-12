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

  $routeProvider.when('/accounts', { templateUrl: '/partials/accountsSearch.html', controller: 'accountsSearchController',title: 'Home'}).
    when('/accounts/search/:loginId', { templateUrl: '/partials/accounts.html', controller: 'accountsController',title: 'Search'}).
    when('/accounts/:accountId',{templateUrl: '/partials/account.html', controller: 'accountController',title: 'Account Profile'}).
    when('/accounts/:accountId/subscriptions', { templateUrl: '/partials/subscriptions.html', controller: 'subscriptionsController',title :'Subscriptions'}).
    when('/subscriptions/:subscriptionId', { templateUrl: '/partials/subscriptionDetail.html', controller: 'subscriptionDetailsController',title :'SubscriptionDetails'}).
    when('/subscriptions/:subscriptionId/nodes', { controller: 'nodesController', templateUrl: '/partials/nodes.html',title : 'Nodes'}).
    when('/subscriptions/:subscriptionId/projects', { controller: 'projectsController', templateUrl: '/partials/projects.html',title : 'Projects'}).
    when('/subscriptions/:subscriptionId/queues', { controller: 'queuesController', templateUrl: '/partials/queues.html',title : 'Queues'}).
    when('/projects/:projectId/builds/:buildNumber',{ controller : 'buildController', templateUrl : '/partials/build.html',title : 'Build Details' }).
    when('/projects/:projectId/builds',{ controller : 'buildsController', templateUrl : '/partials/builds.html',title: 'Builds'}).
    when('/cards/:cardId',{ controller : 'cardsController', templateUrl : '/partials/card.html',title: 'Cards' }).
    when('/hosts',{ controller : 'dockerHostsController', templateUrl : '/partials/dockerhosts.html',title: 'Hosts' }).
    when('/hosts/:hostId/nodes', { controller: 'hostNodesController', templateUrl : '/partials/hostNodes.html',title: 'HostNodes' }).
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
  $rootScope.breadcrumbs = [];

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
$rootScope.$on('$routeChangeSuccess', function(event, current){
   $rootScope.title = current.$$route.title;
    //Whenever the route changes, check the existing breadcrumb array
    //if the route is already present, then delete all items after that point to make this the leaf
    //if the route is not present, then simply push it as the last item.
    var pathElements = $rootScope.title.split(':');
    var element = _.findWhere($rootScope.breadcrumbs,{ path : $location.path() });
    if(element) {
      $rootScope.breadcrumbs.splice(_.indexOf($rootScope.breadcrumbs,element)+1,$rootScope.breadcrumbs.length-1);
      //$rootScope.breadcrumbs = _.reject($rootScope.breadcrumbs,function(x) { return x.path === $location.path(); });
    }
    else {
      $rootScope.breadcrumbs.push({ name : pathElements[0], path : $location.path() });
    }

      });


  $http.defaults.headers.common['Authorization']='token ' + token;
  $http.defaults.headers.common['Content-Type']='application/json;charset=utf8';
}]);

