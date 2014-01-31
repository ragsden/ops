describe('accountController',function() {
	var ctrlScope;
	var accountsService;
	var projectsService;
	var subsService;
	var ctrl;
	var _location;
	var routeParams;
	var httpBackend;
	beforeEach(function() {
		module('angSpa');
		
		inject(function($rootScope,$location,$httpBackend,$routeParams,$controller,AccountsService,subscriptionsService,ProjectsService) {
			
			ctrlScope = $rootScope.$new();
			accountsService = AccountsService;
			projectsService = ProjectsService;
			subsService = subscriptionsService;			
			httpBackend = $httpBackend;
			routeParams = $routeParams;
			_location = $location;

			routeParams.accountId = testData.accountIdGETParam;
			
			spyOn(accountsService,'getAccountById').andCallThrough();
			spyOn(projectsService,'getProjectsBySubscriptionId').andCallThrough();
			spyOn(projectsService,'deleteBuildsByProjectId').andCallThrough();			
			spyOn(subsService,'getSubscriptionsByAccountId').andCallThrough();
			spyOn(subsService,'deleteProjectsBySubId').andCallThrough();			
			spyOn(accountsService,'deleteSubsByAccId').andCallThrough();
			spyOn(accountsService,'deleteAccountById').andCallThrough();			
			
			ctrl = $controller('accountController',
				{
					$scope: ctrlScope, 
					$location: _location,
					$routeParams : routeParams,
					AccountsService: accountsService,
					ProjectsService: projectsService,
					subscriptionsService: subsService,
					}
			 );
					
			});
	});
	
	it('should get account when the controller is created',function() {
		httpBackend.expectGET(config.MW_URL+'/accounts/'+testData.accountIdGETParam)
		.respond(200,testData.accountGET);
		httpBackend.flush();
		expect(accountsService.getAccountById).toHaveBeenCalled();
		expect(ctrlScope.accountModel.account.id).toBe('1234567890qwertyuiopasdf');
	});

	it('should call deleteAccountById when delete account button is clicked', function(){
		//Get account call expected on controller load
		httpBackend.expectGET(config.MW_URL+'/accounts/'+testData.accountIdGETParam)
		.respond(200,testData.accountGET);
		httpBackend.flush();
		expect(accountsService.getAccountById).toHaveBeenCalled();

		// Service calls expected in this order once deleteAccount() is called
		httpBackend.expect('GET', config.MW_URL + '/accounts/' + testData.accountIdGETParam + '/subscriptions')
		.respond(200, testData.subscriptionsGET);
		httpBackend.expectGET(config.MW_URL+'/subscriptions/'+testData.subscriptionProjectsGETParam+'/projects')
		.respond(200,testData.subscriptionProjectsGET);		
		httpBackend.expect('DELETE', config.MW_URL + '/projects/'+ testData.projectIdDELParam + '/builds')
        .respond(200, testData.projectIdDELDataReturned);
        httpBackend.expect('DELETE', config.MW_URL + '/subscriptions/'+ testData.subIdDELParam + '/projects')
        .respond(200, 'OK');
        httpBackend.expect('DELETE', config.MW_URL + '/accounts/'+ testData.accountIdGETParam + '/subscriptions')
        .respond(200, 'OK');
        httpBackend.expect('DELETE', config.MW_URL + '/accounts/'+ testData.accountIdGETParam)
        .respond(200, 'OK');       

		ctrlScope.deleteAccount();

		httpBackend.flush();
		
		expect(subsService.getSubscriptionsByAccountId).toHaveBeenCalled();
		expect(projectsService.getProjectsBySubscriptionId).toHaveBeenCalled();		
		expect(projectsService.deleteBuildsByProjectId).toHaveBeenCalled();
		expect(subsService.deleteProjectsBySubId).toHaveBeenCalled();
		expect(accountsService.deleteSubsByAccId).toHaveBeenCalled();
		expect(accountsService.deleteAccountById).toHaveBeenCalled();
    });
});
 
