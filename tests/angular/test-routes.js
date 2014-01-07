describe('Testing routes',function() {
	it('should check if / resolves correctly',function() {
		module('angSpa');
		inject(function($route) {
			//console.log($route.routes['/']);
			var controller = $route.routes['/'].controller;
			var templateUrl = $route.routes['/'].templateUrl;
			controller.should.be.equal('homeController');
			templateUrl.should.be.equal('/partials/users.html');
		});
	});

	it('should check if containers URL resolves correctly',function() {
		module('angSpa');
		inject(function($route) {
			var controller = $route.routes['/users/:accountId/subscriptions/:subscriptionId/container'].controller;
			var templateUrl = $route.routes['/users/:accountId/subscriptions/:subscriptionId/container'].templateUrl;

			controller.should.be.equal('containerController');
			templateUrl.should.be.equal('/partials/containers.html');

		});
	})
});
