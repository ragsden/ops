/* jshint ignore:start */
describe('Testing routes',function() {
  beforeEach(function() {
    module('angSpa');
  });
  it('should check if /accounts resolves correctly',function() {
    inject(function($route) {
      //console.log($route.routes['/']);
      var controller = $route.routes['/accounts'].controller;
      var templateUrl = $route.routes['/accounts'].templateUrl;
      expect(controller).toEqual('accountsSearchController');
      expect(templateUrl).toEqual('/partials/accountsSearch.html');
      //controller.should.be.equal('accountsSearchController');
      //templateUrl.should.be.equal('/partials/accountsSearch.html');
    });
  });
  it('should check if accountController resolves correctly',function() {
    inject(function($route) {
      //console.log($route.routes['/']);
      var controller = $route.routes['/accounts/:accountId'].controller;
      var templateUrl = $route.routes['/accounts/:accountId'].templateUrl;
      expect(controller).toEqual('accountController');
      expect(templateUrl).toEqual('/partials/account.html');
      //controller.should.be.equal('accountsSearchController');
      //templateUrl.should.be.equal('/partials/accountsSearch.html');
    });
  });

  it('should check if nodesController URL resolves correctly',function() {
    inject(function($route) {
      var controller = $route.routes['/subscriptions/:subscriptionId/nodes'].controller;
      var templateUrl = $route.routes['/subscriptions/:subscriptionId/nodes'].templateUrl;
      expect(controller).toEqual('nodesController');
      expect(templateUrl).toEqual('/partials/nodes.html');
    });
  });

  it('should check if subscriptionsController URL resolves correctly', function(){
    inject(function($route){
      var controller = $route.routes['/accounts/:accountId/subscriptions'].controller;
      var templateUrl = $route.routes['/accounts/:accountId/subscriptions'].templateUrl;
      expect(controller).toEqual('subscriptionsController');
      expect(templateUrl).toEqual('/partials/subscriptions.html');
    });
  });

  it('should check if projectsController resolves correctly',function() {
    inject(function($route) {
      var controller = $route.routes['/subscriptions/:subscriptionId/projects'].controller;
      var templateUrl = $route.routes['/subscriptions/:subscriptionId/projects'].templateUrl;
      expect(controller).toEqual('projectsController');
      expect(templateUrl).toEqual('/partials/projects.html');
    });
  });

  it('should check if buildsController resolves correctly',function() {
    inject(function($route) {
      var controller = $route.routes['/projects/:projectId/builds'].controller;
      var templateUrl = $route.routes['/projects/:projectId/builds'].templateUrl;
      expect(controller).toEqual('buildsController');
      expect(templateUrl).toEqual('/partials/builds.html');
    });
  });

  it('should check if cardsController resolves correctly',function() {
    inject(function($route) {
      var controller = $route.routes['/cards/:cardId'].controller;
      var templateUrl = $route.routes['/cards/:cardId'].templateUrl;
      expect(controller).toEqual('cardsController');
      expect(templateUrl).toEqual('/partials/card.html');
    });
  });

  it('should check if buildController resolves correctly',function() {
    inject(function($route) {
      var controller = $route.routes['/projects/:projectId/builds/:buildNumber'].controller;
      var templateUrl = $route.routes['/projects/:projectId/builds/:buildNumber'].templateUrl;
      expect(controller).toEqual('buildController');
      expect(templateUrl).toEqual('/partials/build.html');
    });
  });

  it('should check if buildController resolves correctly',function() {
    inject(function($route) {
      var controller = $route.routes['/projects/:projectId/builds/:buildNumber'].controller;
      var templateUrl = $route.routes['/projects/:projectId/builds/:buildNumber'].templateUrl;
      expect(controller).toEqual('buildController');
      expect(templateUrl).toEqual('/partials/build.html');
    });
  });
  it('should check if docker hosts page resolves correctly',function() {
    inject(function($route) {
      var controller = $route.routes['/hosts'].controller;
      var templateUrl = $route.routes['/hosts'].templateUrl;
      expect(controller).toEqual('dockerHostsController');
      expect(templateUrl).toEqual('/partials/dockerhosts.html');
    });
  });

it('should check if hosts nodes page resolves correctly',function() {
    inject(function($route) {
      var controller = $route.routes['/hosts/:hostId/nodes'].controller;
      var templateUrl = $route.routes['/hosts/:hostId/nodes'].templateUrl;
      expect(controller).toEqual('hostNodesController');
      expect(templateUrl).toEqual('/partials/hostNodes.html');
    });
  });

it('should check if subscription page resolves correctly',function() {
    inject(function($route) {
      var controller = $route.routes['/subscriptions/:subscriptionId'].controller;
      var templateUrl = $route.routes['/subscriptions/:subscriptionId'].templateUrl;
      expect(controller).toEqual('subscriptionDetailsController');
      expect(templateUrl).toEqual('/partials/subscriptionDetail.html');
    });
  });



});
/* jshint ignore:end */
