describe('Accounts Service',function() {
	var httpBackend;
	var accountsService;
	var bootstrapped = false;
	beforeEach(function() {
		module('angSpa');
		inject(function($httpBackend,AccountsService) {
			
 			if(!bootstrapped) {
				httpBackend = $httpBackend;
				httpBackend.when('GET',config.MW_URL+'/accounts/'+testData.accountIdGETParam)
				.respond(200,testData.accountGET);
				httpBackend.when('GET',config.MW_URL+'/accounts/'+testData.negAccountIdGETParam)
				.respond(400,null);
				accountsService = AccountsService;

				httpBackend.when('GET',config.MW_URL+'/accounts/search/'+testData.accountsSearchByUsernameGETParam)
				.respond(200,testData.accountsGET);
				httpBackend.when('GET',config.MW_URL+'/accounts/search/'+testData.negaccountsSearchByUsernameGETParam)
				.respond(200,testData.negAccountsGET);
				bootstrapped = true;
			}
		});
		
	});
	describe('Account Service',function() {

		it('gets the accounts with matching username',function() {
			var result ;
			
			accountsService.searchAccountsByUsername(testData.accountsSearchByUsernameGETParam,function(err,data) {
				result = data;
			});

			httpBackend.flush();
			expect(result.length).toBe(1);
			expect(result[0].id).toBe(testData.accountsGET[0].id);

		});

		//Negative test
		it('checks for null array for invalid username',function() {
			var result ;
			var status ;
					
			accountsService.searchAccountsByUsername(testData.negaccountsSearchByUsernameGETParam,function(err,data) {
				result = data;
				status = err;
			});

			httpBackend.flush();
			expect(result.length).toBe(0);
			});

		
		it('gets the account for the accountId passed',function() {
			var result ;
			accountsService.getAccountById(testData.accountIdGETParam,function(err,data) {
				result = data;
			});

			httpBackend.flush();
			expect(result.id).toBe(testData.accountGET.id);

		});

		//Negative test
		it('gets a 404 for invalid id',function() {
			var result ;
			var status ;
					
			accountsService.getAccountById(testData.negAccountIdGETParam,function(err,data) {
				result = data;
				status = err;
			});

			httpBackend.flush();
			expect(result).toBe(null);
		   });
	});
	afterEach(function() {
		httpBackend.verifyNoOutstandingExpectation();
     	httpBackend.verifyNoOutstandingRequest();
	});
});