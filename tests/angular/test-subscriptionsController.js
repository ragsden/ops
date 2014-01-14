describe('Testing subscriptionsController',function() {
	var ctrlScope;
    var getAccountByIdService;
	var getSubsService;
	var getPlansService;
	var ctrl;
	var routeParams;
	var httpBackend;
	beforeEach(function() {
		module('angSpa');
		inject(function($rootScope,$httpBackend,$routeParams,$controller, getSubscriptions, getPlans) {
			ctrlScope = $rootScope.$new();
            getSubsService = getSubscriptions;
            getPlansService = getPlans;
			routeParams = $routeParams;
			httpBackend = $httpBackend;

            spyOn(getSubsService, 'getSubscriptionsByAccountId').andCallThrough();
            spyOn(getPlansService, 'getPlanByPlanId').andCallThrough();

            routeParams.accountId = testData.accountIdGETParam;
            routeParams.planId = testData.planIdGETParam;
			
            httpBackend.expect('GET', config.MW_URL + '/accounts/' + testData.accountIdGETParam + '/subscriptions')
					.respond(200, testData.subscriptionsGET);
                    console.log(typeof testData.subscriptionsGET);
			httpBackend.expect('GET', config.MW_URL + '/plans/' + testData.subscriptionsGET[0].plan)
					.respond(200, testData.planGET);

			ctrl = $controller('subscriptionsController',
				{
					$scope : ctrlScope, 
					$routeParams : routeParams,
                    getSubscriptions : getSubsService,
                    getPlans : getPlansService
			     });
			
			});
	});
	
	it('should call getSubscriptionsByAccountId when the controller is created', function() {
        
        expect(getSubsService.getSubscriptionsByAccountId).toHaveBeenCalled();
        httpBackend.flush();
        expect(getPlansService.getPlanByPlanId).toHaveBeenCalled();

	 //   expect(ctrlScope.subscriptionsModel.subscriptions.length).toBe(1);
		//Can add more checks here to validate if test data is assigned in the controller's scope
	});

});
