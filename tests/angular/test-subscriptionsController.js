describe('Testing subscriptionsController',function() {
	var ctrlScope;
	var subsServ;
	var plansServ;
	var ctrl;
	var routeParams;
	var httpBackend;
	beforeEach(function() {
		module('angSpa');
		inject(function($rootScope, $httpBackend, $routeParams, $controller, subscriptionsService, plansService) {
			ctrlScope = $rootScope.$new();
            subsServ = subscriptionsService;
            plansServ = plansService;
			routeParams = $routeParams;
			httpBackend = $httpBackend;

            spyOn(subsServ, 'getSubscriptionsByAccountId').andCallThrough();
            spyOn(plansServ, 'getPlanByPlanId').andCallThrough();

            routeParams.accountId = testData.accountIdGETParam;
            routeParams.planId = testData.planIdGETParam;
			
            httpBackend.expect('GET', config.MW_URL + '/accounts/' + testData.accountIdGETParam + '/subscriptions')
					.respond(200, testData.subscriptionsGET);
			httpBackend.expect('GET', config.MW_URL + '/plans/' + testData.subscriptionsGET[0].plan)
					.respond(200, testData.planGET);

			ctrl = $controller('subscriptionsController',
				{
					$scope : ctrlScope, 
					$routeParams : routeParams,
                    subscriptionsService : subsServ,
                    plansService : plansServ,
			     });
			
			});
	});
	
	it('should call getSubscriptionsByAccountId, getPlanByPlanId when the controller is created', function() {
        
        expect(subsServ.getSubscriptionsByAccountId).toHaveBeenCalled();

        httpBackend.flush();

        expect(plansServ.getPlanByPlanId).toHaveBeenCalled();
        expect(ctrlScope.subscriptionsModel.subscriptions.length).toBe(1);
        expect(ctrlScope.subscriptionsModel.subscriptions[0].id).toBe('123f1f77bcf86cd799439011');
        expect(ctrlScope.subscriptionsModel.subscriptions[0].plan).toBe('0000000000000000000000000000000X');
        expect(ctrlScope.subscriptionsModel.subscriptions[0].projects.length).toBe(1);

        expect(ctrlScope.subscriptionsModel.subscriptions[0].planName).toBe('Free');
		//Can add more checks here to validate if test data is assigned in the controller's scope
	});



});
