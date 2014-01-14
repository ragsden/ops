describe('accountController',function() {
	var ctrlScope;
	var getAccountService;
	var ctrl;
	var _location;
	var routeParams;
	var httpBackend;
	beforeEach(function() {
		module('angSpa');
		
		inject(function($rootScope,$location,$httpBackend,$routeParams,$controller,getAccountById) {
			
			ctrlScope = $rootScope.$new();
			getAccountService = getAccountById;			
			httpBackend = $httpBackend;
			routeParams = $routeParams;
			_location = $location;

			routeParams.accountId = testData.accountIdGETParam;
			
			spyOn(getAccountService,'getAccount').andCallThrough();
						
			
			ctrl = $controller('accountController',
				{
					$scope: ctrlScope, 
					$location: _location,
					$routeParams : routeParams,
					getAccountById : getAccountService,
					}
			 );
					
			});
	});
	
	it('should get account when the controller is created',function() {
		
		httpBackend.expectGET(config.MW_URL+'/accounts/'+testData.accountIdGETParam)
		.respond(200,testData.accountGET);

		httpBackend.flush();
		expect(getAccountService.getAccount).toHaveBeenCalled();
		expect(ctrlScope.accountModel.id).toBe('1234567890qwertyuiopasdf');
	});
});
 
