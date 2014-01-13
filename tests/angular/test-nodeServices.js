describe('Nodes Page',function() {
	var httpBackend;
	var NodeService;
	var bootstrapped = false;
	beforeEach(function() {
		module('angSpa');
		inject(function($httpBackend,NodeService) {
			//Jasmine doesnt not work with a global 'describe' call that runs once
			//so we make sure our test setup is initialized once for a series of tests
 			if(!bootstrapped) {
				httpBackend = $httpBackend;
				httpBackend.when('GET',config.MW_URL+'/subscriptions/'+testData.subscriptionNodesGETParameter+'/nodes')
				.respond(200,testData.subscriptionNodesGET);
				httpBackend.when('GET',config.MW_URL+'/subscriptions/'+testData.negativesubscriptionNodesGETParameter+'/nodes')
				.respond(404,testData.negativesubscriptionNodesGET);

				httpBackend.when('POST',config.MW_URL+'/subscriptions/'+testData.subscriptionNodesGETParameter+'/nodes')
				.respond(202,testData.createNodePOST);

				httpBackend.when('POST',config.MW_URL+'/subscriptions/'+testData.negativesubscriptionNodesGETParameter+'/nodes')
				.respond(403,testData.createNodePOST);

				nodeService = NodeService;
				bootstrapped = true;
			}
		});

		
	});
	describe('Node Service',function() {
		
		it('gets the nodes data for a subscription',function() {
			var result ;
			//Call the service
			nodeService.getNodesBySubscriptionId(testData.subscriptionNodesGETParameter,function(err,data) {
				result = data;
			});

			httpBackend.flush();

			//Make sure that the http call inside the method returns the data that we have given
			//as part of tests
			expect(result.length).toBe(1);
			//Check if the result of the service call matches the data expected.
			expect(result[0].id).toBe(testData.subscriptionNodesGET[0].id);

		});

		//Negative test
		it('gets 404 for invalid subscription',function() {
			var result ;
			var status ;
			//Call the service
			nodeService.getNodesBySubscriptionId(testData.negativesubscriptionNodesGETParameter,
				function(err,data) {
				result = data;
				status = err;
			});

			httpBackend.flush();
			console.log(status);
			expect(result).toBe(undefined);
			expect(status).toBe(404);
		});

		it('creates a new node',function() {
			var status;
			nodeService.createNodeForSubscriptionId(
				testData.subscriptionNodesGETParameter,testData.subscriptionNodesGET[0].id,
				function(err,data) {

				status = err;

			});

			httpBackend.flush();
			expect(status).toBe(202);
		});

		it('returns 403 when node quota is expired',function() {
			var status;
			nodeService.createNodeForSubscriptionId(
				testData.negativesubscriptionNodesGETParameter,testData.subscriptionNodesGET[0].id,
				function(err,data) {

				status = err;
				
			});

			httpBackend.flush();
			expect(status).toBe(403);
		});

	});

	afterEach(function() {
		httpBackend.verifyNoOutstandingExpectation();
     	httpBackend.verifyNoOutstandingRequest();
	});
});