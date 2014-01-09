describe('Testing routes',function() {
	it('should check if / resolves correctly',function() {
		module('angSpa');
		inject(function($route) {
			//console.log($route.routes['/']);
			var controller = $route.routes['/accounts'].controller;
			var templateUrl = $route.routes['/accounts'].templateUrl;
			controller.should.be.equal('accountsSearchController');
			templateUrl.should.be.equal('/partials/accountsSearch.html');
		});
	});

	it('should check if nodesController URL resolves correctly',function() {
		module('angSpa');
		inject(function($route) {
			var controller = $route.routes['/subscriptions/:subscriptionId/nodes'].controller;
			var templateUrl = $route.routes['/subscriptions/:subscriptionId/nodes'].templateUrl;

			controller.should.be.equal('nodesController');
			templateUrl.should.be.equal('/partials/nodes.html');

		});
	})
});
