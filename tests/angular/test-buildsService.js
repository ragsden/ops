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
		it('gets 500  a invalid project',function() {
			var result;
			httpBackend.when('GET',config.MW_URL+'/projects/'+testData.projectIdGETParam+'/builds')
				.respond(500);

			buildService.getBuildsByProjectId(testData.projectIdGETParam,function(err,data) {
				result = err;
			});

				
			httpBackend.flush();
			expect(result).toBe(500);
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

		it('gets the console output of a build on a project',function() {
			var result;
			httpBackend.when('GET',config.MW_URL+'/projects/'+testData.testProjectId+'/builds/' + testData.testBuildNumber + "/console")
				.respond(200,testData.testBuildData.console);

			buildService.getConsoleByBuildNo(testData.testProjectId,testData.testBuildNumber,function(err,data) {
				result = data;
			});				
			httpBackend.flush();
			expect(result[0].output).toBe('The build finished successfully!');
		});

        it('gets a valid response for downloading build artifacts',function() {
          var result;
          	httpBackend.when('GET',config.MW_URL+'/projects/'+testData.testProjectId+'/builds/' + testData.testBuildNumber + "/artifacts?noredirect=true")
				.respond(200);
            buildService.getBuildArtifact(testData.testProjectId,testData.testBuildNumber,function(status,data) {

              result = status;
            });
            httpBackend.flush();
            expect(result).toBe(null);
        });


        it('gets a valid response for  build Id',function() {
          var result;
          	httpBackend.when('GET',config.MW_URL+'/projects/'+testData.testProjectId+'/builds/' + testData.testBuildNumber)
				.respond(200);
            buildService.getById(testData.testProjectId,testData.testBuildNumber,function(status,data) {

              result = status;
            });
            httpBackend.flush();
            expect(result).toBe(null);
        });
        it('gets a 500 response for  build Id',function() {
          var result;
          	httpBackend.when('GET',config.MW_URL+'/projects/'+testData.testProjectId+'/builds/' + testData.testBuildNumber)
				.respond(500);
            buildService.getById(testData.testProjectId,testData.testBuildNumber,function(status,data) {

              result = status;
            });
            httpBackend.flush();
            expect(result).toBe(500);
        });

	
	afterEach(function() {
		httpBackend.verifyNoOutstandingExpectation();
     	httpBackend.verifyNoOutstandingRequest();
	});
});
