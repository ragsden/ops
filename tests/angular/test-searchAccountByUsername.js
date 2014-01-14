describe('AccountsSearch Page',function() {
	var httpBackend;
	var searchAccountsService;
	var bootstrapped = false;
	beforeEach(function() {
		module('angSpa');
		inject(function($httpBackend,searchAccountsByUsername) {
			//Jasmine doesnt not work with a global 'describe' call that runs once
			//so we make sure our test setup is initialized once for a series of tests
 			if(!bootstrapped) {
				httpBackend = $httpBackend;
				httpBackend.when('GET',config.MW_URL+'/accounts/search/'+testData.accountsSearchByUsernameGETParam)
				.respond(200,testData.accountsGET);
				httpBackend.when('GET',config.MW_URL+'/accounts/search/'+testData.negaccountsSearchByUsernameGETParam)
				.respond(404,testData.negativesubscriptionNodesGET);
				searchAccountsService = searchAccountsByUsername;
				bootstrapped = true;
			}
		});

		
	});
	describe('Search Accounts Service',function() {
		
		it('gets the accounts with matching username',function() {
			var result ;
			
			searchAccountsService.searchAccounts(testData.accountsSearchByUsernameGETParam,function(err,data) {
				result = data;
			});

			httpBackend.flush();
			expect(result.length).toBe(1);
			expect(result[0].id).toBe(testData.accountsGET[0].id);

		});

		//Negative test
		it('gets 404 for invalid username',function() {
			var result ;
			var status ;
					
			searchAccountsService.searchAccounts(testData.negaccountsSearchByUsernameGETParam,function(err,data) {
				result = data;
				status = err;
			});

			httpBackend.flush();
			expect(result).toBe(undefined);
			expect(status).toBe(404);
		});

	});
	
	afterEach(function() {
		httpBackend.verifyNoOutstandingExpectation();
     	httpBackend.verifyNoOutstandingRequest();
	});
});