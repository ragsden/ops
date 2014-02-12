describe('Queues Page',function() {
	var httpBackend;
	var queuesService;
	var bootstrapped = false;
	beforeEach(function() {
		module('angSpa');
		inject(function($httpBackend,QueuesService) {
			
 			if(!bootstrapped) {
				httpBackend = $httpBackend;
				httpBackend.when('GET',config.MW_URL+'/subscriptions/'+testData.test_subsId + '/queues')
				.respond(200,testData.testQueuesData);
				httpBackend.when('GET',config.MW_URL+'/subscriptions/'+testData.negtest_subsId + '/queues')
				.respond(400,testData.getQueuesErr);

				queuesService = QueuesService;
				bootstrapped = true;
					}
		});
		
	});
	describe('Queues Service',function() {

		it('gets the queues by subID',function() {
			var result ;			
			queuesService.getQueuesBySubId(testData.test_subsId,function(err,data) {
				result = data;
			});
			httpBackend.flush();
			expect(result[0].name).toBe(testData.testQueuesData[0].name);
			expect(result[0].pending_acks).toBe(testData.testQueuesData[0].pending_acks);
		});

		it('checks for error for invalid subId',function() {
			var result ;					
			queuesService.getQueuesBySubId(testData.negtest_subsId,function(err,data) {
				result = data;
			});
			httpBackend.flush();
			expect(result).toBe("Error getting the Queues Information.");
		   });
		});
	afterEach(function() {
		httpBackend.verifyNoOutstandingExpectation();
     	httpBackend.verifyNoOutstandingRequest();
	});
});