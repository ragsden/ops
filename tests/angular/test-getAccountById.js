describe('Account Page',function() {
	var httpBackend;
	var getAccountService;
	var bootstrapped = false;
	beforeEach(function() {
		module('angSpa');
		inject(function($httpBackend,getAccountById) {
			//Jasmine doesnt not work with a global 'describe' call that runs once
			//so we make sure our test setup is initialized once for a series of tests
 			if(!bootstrapped) {
				httpBackend = $httpBackend;
				httpBackend.when('GET',config.MW_URL+'/accounts/'+testData.accountIdGETParam)
				.respond(200,testData.accountGET);
				httpBackend.when('GET',config.MW_URL+'/accounts/'+testData.negAccountIdGETParam)
				.respond(200,testData.negAccountGET);
				getAccountService = getAccountById;
				bootstrapped = true;
			}
		});

		
	});
	describe('Account Service',function() {
		
		it('gets the account for the accountId passed',function() {
			var result ;
			getAccountService.getAccount(testData.accountIdGETParam,function(err,data) {
				result = data;
			});

			httpBackend.flush();
			expect(result.id).toBe(testData.accountGET.id);

		});

		//Negative test
		it('gets a null object for invalid id',function() {
			var result ;
			var status ;
					
			getAccountService.getAccount(testData.negAccountIdGETParam,function(err,data) {
				result = data;
				status = err;
			});

			httpBackend.flush();
			expect(result.id).toBe(undefined);
		   });

	});
	
	afterEach(function() {
		httpBackend.verifyNoOutstandingExpectation();
     	httpBackend.verifyNoOutstandingRequest();
	});
});