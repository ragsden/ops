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
			expect(result[0].phase).toBe('Queued');
		});

		it('testing - deleting a build by projects/projectid/builds/buildNumber', function(){
			httpBackend.when('DELETE', config.MW_URL + '/projects/'+ testData.projectIdDELParam + '/builds/' + testData.testBuildNumber)
            	.respond(200, testData.buildnumberDELDataReturned);
    		var statusReceived;
    		buildService.deleteBuildByBuildNumber(testData.projectIdDELParam, testData.testBuildNumber, function(status, data){
        		statusReceived = status;
    			});
    		httpBackend.flush();
   			expect(statusReceived).toBe(200);
  		});

	});
	
	afterEach(function() {
		httpBackend.verifyNoOutstandingExpectation();
     	httpBackend.verifyNoOutstandingRequest();
	});
});