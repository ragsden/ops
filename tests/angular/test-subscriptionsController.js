describe('Testing subscriptionsController',function() {
	var ctrlScope;
	var subsServ;
	var plansServ;
	var ctrl;
	var routeParams;
	var httpBackend;
	beforeEach(function() {
		module('angSpa');
		inject(function($rootScope, $httpBackend, $routeParams, $controller, subscriptionsService, plansService, AccountsService) {
			ctrlScope = $rootScope.$new();
            subsServ = subscriptionsService;
            plansServ = plansService;
            accountsServ = AccountsService;
			routeParams = $routeParams;
			httpBackend = $httpBackend;

            spyOn(accountsServ, 'getAccountById').andCallThrough();
            spyOn(subsServ, 'getSubscriptionsByAccountId').andCallThrough();
            spyOn(plansServ, 'getPlanByPlanId').andCallThrough();
            spyOn(subsServ, 'deleteSubscriptionBySubId').andCallThrough();

            httpBackend.expect('GET', config.MW_URL + "/accounts/" + testData.accountIdGETParam)
            .respond(200, testData.accountGET);
            httpBackend.expect('GET', config.MW_URL + '/accounts/' + testData.accountIdGETParam + '/subscriptions')
		    .respond(200, testData.subscriptionsGET);
		    httpBackend.expect('GET', config.MW_URL + '/plans/' + testData.subscriptionsGET[0].plan)
			.respond(200, testData.planGET);
        
        
            routeParams.accountId = testData.accountIdGETParam;
            routeParams.planId = testData.planIdGETParam;
			
			ctrl = $controller('subscriptionsController',
				{
					$scope : ctrlScope, 
					$routeParams : routeParams,
                    subscriptionsService : subsServ,
                    plansService : plansServ,
                    AccountsService : accountsServ
			     });
			
			});
	});
	
	it('should call getSubscriptionsByAccountId, getPlanByPlanId when the controller is created', function() {
        
        httpBackend.flush();

        expect(accountsServ.getAccountById).toHaveBeenCalled();
        expect(subsServ.getSubscriptionsByAccountId).toHaveBeenCalled();
        expect(plansServ.getPlanByPlanId).toHaveBeenCalled();
        expect(ctrlScope.subscriptionsModel.accountInfo.identities[0].userName).toBe('testUser');
        expect(ctrlScope.subscriptionsModel.subscriptions.length).toBe(1);
        expect(ctrlScope.subscriptionsModel.subscriptions[0].id).toBe('123f1f77bcf86cd799439011');
        expect(ctrlScope.subscriptionsModel.subscriptions[0].plan).toBe('0000000000000000000000000000000X');
        expect(ctrlScope.subscriptionsModel.subscriptions[0].projects.length).toBe(1);

        expect(ctrlScope.subscriptionsModel.subscriptions[0].planName).toBe('Free');
		//Can add more checks here to validate if test data is assigned in the controller's scope
	});

    
    it('should call deleteSubscriptionBySubId when delete button clicked', function(){
        //since controller is created again, there are calls to get subscriptions, plan
        //requests in pending, which get flushed with .flush()
        httpBackend.flush();

        //now the two calls are expected.
        expect(accountsServ.getAccountById).toHaveBeenCalled();
        expect(subsServ.getSubscriptionsByAccountId).toHaveBeenCalled();
        expect(plansServ.getPlanByPlanId).toHaveBeenCalled();

        
        //now that controller and services are loaded, we explain the format of request
        //and ORDER of execution according to the controller
        //Since init() is being called again (get subs, plan are executed again)
        httpBackend.expect('DELETE', config.MW_URL + '/subscriptions/'+ testData.subIdDELParam)
        .respond(200, 'OK');
		httpBackend.expect('GET', config.MW_URL + '/accounts/' + testData.accountIdGETParam)
		.respond(200, testData.accountGET);
        httpBackend.expect('GET', config.MW_URL + '/accounts/' + testData.accountIdGETParam + '/subscriptions')
	    .respond(200, testData.subscriptionsGET);
		httpBackend.expect('GET', config.MW_URL + '/plans/' + testData.subscriptionsGET[0].plan)
		.respond(200, testData.planGET);
        
        //Call the delete function in the controller
        ctrlScope.delSubBySubId(testData.subIdDELParam);

        //flush the http requests
        httpBackend.flush();

        //expect them in this order
        expect(accountsServ.getAccountById).toHaveBeenCalled();
        expect(subsServ.deleteSubscriptionBySubId).toHaveBeenCalled();
        expect(subsServ.getSubscriptionsByAccountId).toHaveBeenCalled();
        expect(plansServ.getPlanByPlanId).toHaveBeenCalled();
        
    }); 



});
