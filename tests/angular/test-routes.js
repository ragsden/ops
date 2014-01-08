describe('Testing routes',function() {
	it('should check if / resolves correctly',function() {
		module('angSpa');
		inject(function($route) {
			//console.log($route.routes['/']);
			var controller = $route.routes['/accounts'].controller;
			var templateUrl = $route.routes['/accounts'].templateUrl;
			controller.should.be.equal('accountsSearchController');
			templateUrl.should.be.equal('/partials/search.html');
		});
	});

	it('should check if containers URL resolves correctly',function() {
		module('angSpa');
		inject(function($route) {
			var controller = $route.routes['/subscriptions/:subscriptionId/containers'].controller;
			var templateUrl = $route.routes['/subscriptions/:subscriptionId/containers'].templateUrl;

			controller.should.be.equal('containerController');
			templateUrl.should.be.equal('/partials/containers.html');

		});
	})
});
