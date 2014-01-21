describe('Nodes Page',function() {
	var httpBackend;
	var NodeService;
	beforeEach(function() {
		module('angSpa');
		inject(function($httpBackend,NodeService) {
			//Jasmine doesnt not work with a global 'describe' call that runs once
			//so we make sure our test setup is initialized once for a series of tests
			httpBackend = $httpBackend;
			httpBackend.when('GET',config.MW_URL+'/subscriptions/'+testData.subscriptionNodesGETParameter+'/nodes')
			.respond(200,testData.subscriptionNodesGET);
			httpBackend.when('GET',config.MW_URL+'/subscriptions/'+testData.negativesubscriptionNodesGETParameter+'/nodes')
			.respond(404,null);

			
			httpBackend.when('DELETE',
				config.MW_URL+'/nodes/'+testData.subscriptionNodesGET[0].id)
			.respond(202,{});


			nodeService = NodeService;
			
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
			expect(result[0].state).toBe(testData.subscriptionNodesGET[0].state);
			
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
			expect(result).toBe(null);
			expect(status).toBe(404);
		});

		it('creates a new node',function() {
			var status;

			httpBackend.when('POST',config.MW_URL+'/nodes')
				.respond(202,testData.createNodePOST);


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
			httpBackend.when('POST',config.MW_URL+'/nodes')
				.respond(403,{});

			nodeService.createNodeForSubscriptionId(
				testData.negativesubscriptionNodesGETParameter,testData.subscriptionNodesGET[0].id,
				function(err,data) {
					status = err;
				
				});

			httpBackend.flush();
			expect(status).toBe(403);
		});

		it('deletes a node',function() {
			var status;
			nodeService.deleteNodeById(
				testData.subscriptionNodesGETParameter,
				testData.subscriptionNodesGET[0].id,function(err,data) {
					status = err;
				});

			httpBackend.flush();
			expect(status).toBe(202);
		});

	});
	
	afterEach(function() {
		httpBackend.verifyNoOutstandingExpectation();
     	httpBackend.verifyNoOutstandingRequest();
	});
});