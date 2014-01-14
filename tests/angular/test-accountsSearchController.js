//Testing controllers... 
describe('accountsSearchController',function() {
	var ctrlScope;
	var accountsSearchService;
	var ctrl;
	var routeParams;
	var httpBackend;
	var _location;
	beforeEach(function() {
		module('angSpa');
		//Need to inject all required dependencies to setup the test
		inject(function($rootScope,$location,$httpBackend,$controller,searchAccountsByUsername) {
			//Create a new scope so that we can inspect the controller's $scope.
			console.log('bootstrap');
			ctrlScope = $rootScope.$new();
			accountsSearchService = searchAccountsByUsername;			
			httpBackend = $httpBackend;
			_location = $location;
			
			spyOn(accountsSearchService,'searchAccounts').andCallThrough();
						
			
			ctrl = $controller('accountsSearchController',
				{
					$scope: ctrlScope, 
					$location: _location,
					searchAccountByUsername:accountsSearchService,
					}
			 );
			 ctrlScope.accountsSearchModel.loginId = testData.accountsSearchByUsernameGETParam ;		
			});
	});
	
	it('should call searchAccounts of searchAccountByUsername Service',function() {
		//Positive Test: If this POST gets called, we expect a 200 response.
		console.log('AAA ' +ctrlScope);
		httpBackend.expectGET(config.MW_URL+'/accounts/search/'+testData.accountsSearchByUsernameGETParam)
		.respond(200,testData.accountsGET);

		ctrlScope.getAccount();

		httpBackend.flush();

		expect(accountsSearchService.searchAccounts).toHaveBeenCalled();
		expect(ctrlScope.accountsSearchModel.accounts[0].id).toBe('1234567890qwertyuiopasdf');
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