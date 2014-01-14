describe('accountController',function() {
	var ctrlScope;
	var accountsService;
	var ctrl;
	var _location;
	var routeParams;
	var httpBackend;
	beforeEach(function() {
		module('angSpa');
		
		inject(function($rootScope,$location,$httpBackend,$routeParams,$controller,AccountsService) {
			
			ctrlScope = $rootScope.$new();
			accountsService = AccountsService;			
			httpBackend = $httpBackend;
			routeParams = $routeParams;
			_location = $location;

			routeParams.accountId = testData.accountIdGETParam;
			
			spyOn(accountsService,'getAccountById').andCallThrough();			
			
			ctrl = $controller('accountController',
				{
					$scope: ctrlScope, 
					$location: _location,
					$routeParams : routeParams,
					AccountsService: accountsService,
					}
			 );
					
			});
	});
	
	it('should get account when the controller is created',function() {
		httpBackend.expectGET(config.MW_URL+'/accounts/'+testData.accountIdGETParam)
		.respond(200,testData.accountGET);
		httpBackend.flush();
		expect(accountsService.getAccountById).toHaveBeenCalled();
		expect(ctrlScope.accountModel.id).toBe('1234567890qwertyuiopasdf');
	});
});
 
