describe('Testing subscriptionsController',function() {
	var ctrlScope;
	var getSubsService;
	var getPlansService;
	var ctrl;
	var routeParams;
	var httpBackend;
	beforeEach(function() {
		module('angSpa');
		//Need to inject all required dependencies to setup the test
		inject(function($rootScope,$httpBackend,$routeParams,$controller, getSubscriptions, getPlans) {
			//Create a new scope so that we can inspect the controller's $scope.
			ctrlScope = $rootScope.$new();
            getSubsService = getSubscriptions;
            getPlansService = getPlans;
			routeParams = $routeParams;
			httpBackend = $httpBackend;

			//spy on the service API calls, and monitor them, but let them execute.
			//We just want to check if they are used in the controller
            spyOn(getSubsService, 'getSubscriptionsByAccountId').andCallThrough();
            spyOn(getPlansService, 'getPlanByPlanId').andCallThrough();

   //         routeParams.accountId = testData.accountIdGETParam;

			//Since the controller calls these APIs we expect to get some data back
			//The services actually mock out the backend service, here we just want to check
			//the API call and its output.
			httpBackend.expect('GET', config.MW_URL + '/accounts/' + testData.accountIdGETParam  +'/subscriptions')
					.respond(200, testData.subscriptionsGET);
			httpBackend.expect('GET', config.MW_URL + '/plans/' + testData.planIdGETParam)
					.respond(200, testData.planGET);

			//create the controller. The parameters are the same as used in the actual controller.
			ctrl = $controller('subscriptionsController',
				{
					$scope : ctrlScope, 
					$routeParams : routeParams,
                    getSubscriptions : getSubsService,
                    getPlans : getPlansService
			     });
			
			});
	});
	
	it('should call getSubscriptionsByAccountId when the controller is created',function() {
        expect(getSubsService.getSubscriptionsByAccountId).toHaveBeenCalled();


  //      httpBackend.flush();
  //	  expect(ctrlScope.subscriptionsModel.subscriptions.length).toBe(1);
		//Can add more checks here to validate if test data is assigned in the controller's scope
	});

});
