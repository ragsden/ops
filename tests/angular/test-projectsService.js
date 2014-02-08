describe('Projects Service',function() {
	var httpBackend;
	var projectsService;
	var bootstrapped = false;
	beforeEach(function() {
		module('angSpa');
		inject(function($httpBackend,ProjectsService) {
			
 			if(!bootstrapped) {
				httpBackend = $httpBackend;
				httpBackend.when('GET',config.MW_URL+'/subscriptions/'+testData.subscriptionProjectsGETParam+'/projects')
				.respond(200,testData.subscriptionProjectsGET);
				httpBackend.when('GET',config.MW_URL+'/subscriptions/'+testData.negsubscriptionProjectsGETParam+'/projects')
				.respond(200,testData.negsubscriptionProjectsGET);
				
                httpBackend.when('GET', config.MW_URL + '/projects/'+ testData.projectIdGETParam)
            	.respond(200, testData.projectGETByProjectId);
            	httpBackend.when('PUT', config.MW_URL + '/projects/'+ testData.projectId, testData.projectUpdate)
            	.respond(200, testData.projectUpdateReturns);

				httpBackend.when('DELETE', config.MW_URL + '/projects/'+ testData.projectIdDELParam)
            	.respond(200, testData.projectIdDELDataReturned);
            	httpBackend.when('DELETE', config.MW_URL + '/projects/'+ testData.negProjectIdDELParam)
            	.respond(404, testData.negProjectIdDELDataReturned);

            	httpBackend.when('DELETE', config.MW_URL + '/projects/'+ testData.projectIdDELParam + '/builds')
            	.respond(200, testData.projectIdDELDataReturned);
            	httpBackend.when('DELETE', config.MW_URL + '/projects/'+ testData.negProjectIdDELParam + '/builds')
            	.respond(404, testData.negProjectIdDELDataReturned);

				projectsService = ProjectsService;

				bootstrapped = true;
			}
		});
		
	});
	describe('Projects Service',function() {

		it('gets the projects for a subscription',function() {
			var result ;
			
			projectsService.getProjectsBySubscriptionId(testData.subscriptionProjectsGETParam,function(err,data) {
				result = data;
			});

			httpBackend.flush();
			expect(result.length).toBe(1);
			expect(result[0].id).toBe(testData.subscriptionProjectsGET[0].id);
			expect(result[0].name).toBe(testData.subscriptionProjectsGET[0].name);
			expect(result[0].permissions[0].account).toBe(testData.subscriptionProjectsGET[0].permissions[0].account);

		});

		//Negative test
		it('testing-get projects for invalid subscriptionId',function() {
			var result ;
			var status ;
					
			projectsService.getProjectsBySubscriptionId(testData.negsubscriptionProjectsGETParam,function(err,data) {
				result = data;
				status = err;
			});

			httpBackend.flush();
			expect(result.length).toBe(0);
			});
		//get project by project id
        it('testing - getting project details using a valid projectId', function(){
    		var projectData;
    		projectsService.getProjectByProjectId(testData.projectIdGETParam, function(err, data){
              projectData = data;
            });
    		httpBackend.flush();
            //add more assertions
   			expect(projectData.id).toBe(testData.projectIdGETParam);
  		});

        //update project by project id
		it('testing - updating a project using a valid project Id', function(){
    		var statusReceived;
    		projectsService.updateProjectByProjectId(testData.projectId, testData.projectUpdate, function(status, data){
        		statusReceived = status;
    			});
    		httpBackend.flush();
   			expect(statusReceived).toBe(200);
  		});

		it('testing - deleting a project using a valid projectId', function(){
    		var statusReceived;
    		projectsService.deleteProjectById(testData.projectIdDELParam, function(status, data){
        		statusReceived = status;
    			});
    		httpBackend.flush();
   			expect(statusReceived).toBe(200);
  		});
 
  		it('testing - deleting a project by invalid projetId', function(){
    		var statusReceived;
    		projectsService.deleteProjectById(testData.negProjectIdDELParam, function(status, data){
       		 statusReceived = status;
    			});
    		httpBackend.flush();
    		expect(statusReceived).not.toBe(200);
  		});


		it('testing - deleting builds for a valid projectId', function(){
    		var statusReceived;
    		projectsService.deleteBuildsByProjectId(testData.projectIdDELParam, function(status, data){
        		statusReceived = status;
    			});
    		httpBackend.flush();
   			expect(statusReceived).toBe(200);
  		});
 
  		it('testing - deleting builds for an invalid projetId', function(){
    		var statusReceived;
    		projectsService.deleteBuildsByProjectId(testData.negProjectIdDELParam, function(status, data){
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
