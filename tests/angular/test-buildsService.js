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
	
		it('trigger a new build',function() {
			var statusReceived;
			var result;
			httpBackend.when('POST',config.MW_URL+'/projects/'+testData.testProjectId+'/build')
				.respond(200,testData.postBuildByProjectId);

			buildService.runBuildByProjectId(testData.testProjectId, function(status,data) {
				statusReceived = status;
				result = data;
			});
			httpBackend.flush();
			expect(statusReceived).toBe(200);
			expect(result.buildNumbers).toBe(1);

		});

		it('returns error status when error while trigeering a new build',function() {
			var statusReceived;
			httpBackend.when('POST',config.MW_URL+'/projects/'+testData.negTestProjectId+'/build')
				.respond(400,null);

			buildService.runBuildByProjectId(testData.negTestProjectId, function(status,data) {
				statusReceived = status;
			});
			httpBackend.flush();
			expect(statusReceived).not.toBe(200);
		});
	
	afterEach(function() {
		httpBackend.verifyNoOutstandingExpectation();
     	httpBackend.verifyNoOutstandingRequest();
	});
});
