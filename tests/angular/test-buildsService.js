describe('Builds Service',function() {
	var httpBackend;
	var buildService;
	beforeEach(function() {
		module('angSpa');
		inject(function($httpBackend,BuildsService) {
			httpBackend = $httpBackend;
			buildService = BuildsService;
		});

		
	});
	describe('Node Service',function() {
		
		it('gets the builds for a project',function() {
			var result;
			httpBackend.when('GET',config.MW_URL+'/projects/'+testData.testProjectId+'/builds')
				.respond(200,testData.testProjectData);

			buildService.getBuildsByProjectId(testData.testProjectId,function(err,data) {
				result = data;
			});

				
			httpBackend.flush();
			expect(result[0].buildNumber).toBe(1);
			expect(result[0].phase).toBe(1);
		});

	});
	
	afterEach(function() {
		httpBackend.verifyNoOutstandingExpectation();
     	httpBackend.verifyNoOutstandingRequest();
	});
});
