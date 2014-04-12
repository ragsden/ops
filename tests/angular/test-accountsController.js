//Testing controllers... 
describe('accountsController',function() {
	var ctrlScope;
	var accountsService;
	var ctrl;
	var routeParams;
	var httpBackend;
	var _location;
	beforeEach(function() {
		module('angSpa');
		//Need to inject all required dependencies to setup the test
		inject(function($rootScope,$routeParams,$location,$httpBackend,$controller,AccountsService) {
			//Create a new scope so that we can inspect the controller's $scope.
			ctrlScope = $rootScope.$new();
			accountsService = AccountsService;			
			httpBackend = $httpBackend;
			_location = $location;
			routeParams = $routeParams;

			routeParams.loginId = testData.accountsSearchByUsernameGETParam;
			spyOn(accountsService,'searchAccountsByUsername').andCallThrough();
						
			
			ctrl = $controller('accountsController',
				{
					$scope: ctrlScope, 
					$location: _location,
					AccountsService: accountsService,
					}
			 );
			 });
	});
	
	it('should call searchAccountsByUsername of AccountsService ',function() {
		httpBackend.expectGET(config.MW_URL+'/accounts/search/'+testData.accountsSearchByUsernameGETParam)
		.respond(200,testData.accountsGET);
		httpBackend.flush();
		expect(accountsService.searchAccountsByUsername).toHaveBeenCalled();
		expect(ctrlScope.accountsModel.accounts[0].id).toBe('1234567890qwertyuiopasdf');
	});

	it('should change the path to /accounts/accountId',function() {
		ctrlScope.getAccountById(testData.accountIdGETParam);
		expect(_location.path()).toBe('/accounts/'+testData.accountIdGETParam);
	});

   it('should change the path to /accounts/accountId/subscriptions',function() {
		ctrlScope.getSubscriptions(testData.accountIdGETParam);
		expect(_location.path()).toBe('/accounts/'+testData.accountIdGETParam + '/subscriptions');
	});


});