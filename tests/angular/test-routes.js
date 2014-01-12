describe('Testing routes',function() {
	it('should check if / resolves correctly',function() {
		module('angSpa');
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

	it('should check if nodesController URL resolves correctly',function() {
		module('angSpa');
		inject(function($route) {
			var controller = $route.routes['/subscriptions/:subscriptionId/nodes'].controller;
			var templateUrl = $route.routes['/subscriptions/:subscriptionId/nodes'].templateUrl;
			expect(controller).toEqual('nodesController');
			expect(templateUrl).toEqual('/partials/nodes.html');
		});
	})
});
