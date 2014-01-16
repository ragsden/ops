//Testing controllers... 
describe('accountsSearchController',function() {
	var ctrlScope;
	var ctrl;
	var _location;
	beforeEach(function() {
		module('angSpa');
		//Need to inject all required dependencies to setup the test
		inject(function($rootScope,$location,$controller) {
			//Create a new scope so that we can inspect the controller's $scope.
			
			ctrlScope = $rootScope.$new();			
			_location = $location;						
			
			ctrl = $controller('accountsSearchController',
				{
					$scope: ctrlScope, 
					$location: _location,
					}
			 );
			ctrlScope.accountsSearchModel.loginId = testData.accountsSearchByUsernameGETParam ; 
			});
	});
	
	it('should change the path to /accounts/search/username',function() {
		ctrlScope.searchAccounts();
		expect(_location.path()).toBe('/accounts/search/'+testData.accountsSearchByUsernameGETParam);
	});

});