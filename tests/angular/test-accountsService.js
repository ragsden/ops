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

				httpBackend.when('DELETE', config.MW_URL + '/accounts/'+ testData.accountIdGETParam)
            	.respond(200, 'OK');
            	httpBackend.when('DELETE', config.MW_URL + '/accounts/'+ testData.negAccountIdGETParam)
            	.respond(404, 'Bad Request');

            	httpBackend.when('DELETE', config.MW_URL + '/accounts/'+ testData.accountIdGETParam + '/subscriptions')
            	.respond(200, 'OK');
            	httpBackend.when('DELETE', config.MW_URL + '/accounts/'+ testData.negAccountIdGETParam + '/subscriptions')
            	.respond(404, 'Bad Request');

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
		it('gets a 400 for invalid id',function() {
			var result ;
			var status ;
					
			accountsService.getAccountById(testData.negAccountIdGETParam,function(err,data) {
				result = data;
				status = err;
			});

			httpBackend.flush();
			expect(result).toBe(null);
		   });

		it('testing - deleting user account using a valid accountId', function(){
    		var statusReceived;
    		accountsService.deleteAccountById(testData.accountIdGETParam, function(status, data){
        		statusReceived = status;
    			});
    		httpBackend.flush();
   			expect(statusReceived).toBe(200);
  		});
 
  		it('testing - error on deleting an account using invalid accountId', function(){
    		var statusReceived;
    		accountsService.deleteAccountById(testData.negAccountIdGETParam, function(status, data){
       		 statusReceived = status;
    			});
    		httpBackend.flush();
    		expect(statusReceived).not.toBe(200);
  		});


		it('testing - deleting subscriptions of user account using a valid accountId', function(){
    		var statusReceived;
    		accountsService.deleteSubsByAccId(testData.accountIdGETParam, function(status, data){
        		statusReceived = status;
    			});
    		httpBackend.flush();
   			expect(statusReceived).toBe(200);
  		});
 
  		it('testing - error on deleting subscriptions using invalid accountId', function(){
    		var statusReceived;
    		accountsService.deleteSubsByAccId(testData.negAccountIdGETParam, function(status, data){
       		 statusReceived = status;
    			});
    		httpBackend.flush();
    		expect(statusReceived).not.toBe(200);
  		});
	});
	afterEach(function() {
		httpBackend.verifyNoOutstandingExpectation();
     	httpBackend.verifyNoOutstandingRequest();
	});
});