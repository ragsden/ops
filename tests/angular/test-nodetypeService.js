describe('Nodes Page',function() {
	var httpBackend;
	var nodeTypeService;
	var bootstrapped = false;
	beforeEach(function() {
		module('angSpa');
		inject(function($httpBackend,NodeTypeService) {
			//Jasmine doesnt not work with a global 'describe' call that runs once
			//so we make sure our test setup is initialized once for a series of tests
 			if(!bootstrapped) {
				httpBackend = $httpBackend;
				httpBackend.when('GET',config.MW_URL+'/nodetypes')
					.respond(200,testData.nodeTypesGET);
			
				nodeTypeService = NodeTypeService;
				bootstrapped = true;
			}
		});

		
	});
	describe('NodeType Service',function() {
		
		it('gets all node types',function() {
			var result ;
			//Call the service
			nodeTypeService.getAllNodeTypes(function(err,data) {
				result = data;
			});

			httpBackend.flush();

			//Make sure that the http call inside the method returns the data that we have given
			//as part of tests
			expect(result.length).toBe(2);
			//Check if the result of the service call matches the data expected.
			expect(result[0].id).toBe(testData.nodeTypesGET[0].id);
			expect(result[0].name).toBe(testData.nodeTypesGET[0].name);
			expect(result[0].description).toBe(testData.nodeTypesGET[0].description);
			expect(result[0].id).toEqual(jasmine.any(String));
			expect(result[0].name).toEqual(jasmine.any(String));
			expect(result[0].description).toEqual(jasmine.any(String));

		});

	});
	
	afterEach(function() {
		httpBackend.verifyNoOutstandingExpectation();
     	httpBackend.verifyNoOutstandingRequest();
	});
});