//Testing controllers... 
describe('BuildsController',function() {
	var ctrlScope;
	var buildsService;
	var ctrl;
	var routeParams;
	var httpBackend;
	var location;
	beforeEach(function() {
		module('angSpa');
		//Need to inject all required dependencies to setup the test
		inject(function($rootScope,$location,$httpBackend,$routeParams,$controller,BuildsService) {
			//Create a new scope so that we can inspect the controller's $scope.
			ctrlScope = $rootScope.$new();
			buildsService = BuildsService;
			routeParams = $routeParams;
			httpBackend = $httpBackend;
			location = $location;

			//spy on the service API calls, and monitor them, but let them execute.
			//We just want to check if they are used in the controller
			spyOn(buildsService,'getBuildsByProjectId').andCallThrough();
			spyOn(buildsService,'deleteBuildByBuildNumber').andCallThrough();
			spyOn(buildsService,'runBuildByProjectId').andCallThrough();
            spyOn(buildsService,'getBuildArtifact').andCallThrough();
			routeParams.projectId = testData.testProjectId;

			//Since the controller calls these APIs we expect to get some data back
			//The services actually mock out the backend service, here we just want to check
			//the API call and its output.
			httpBackend.expect('GET',
					config.MW_URL+'/projects/'+testData.testProjectId+'/builds')
					.respond(200,testData.testProjectData);
            httpBackend.expect('GET',
					config.MW_URL+'/projects/'+testData.testProjectId+'/builds/1/artifacts?noredirect=true')
					.respond(200);
			//create the controller. The parameters are the same as used in the actual controller.
			ctrl = $controller('buildsController',
				{
					$scope: ctrlScope, 
					$routeParams:routeParams,
					BuildsService:buildsService,
					$location : location
				}
					);

			
			});
	});
	
	it('should call getBuildsByProjectId when the controller is created',function() {

		expect(buildsService.getBuildsByProjectId).toHaveBeenCalled();
		
		httpBackend.flush();

		expect(ctrlScope.builds.length).toBe(1);
		
		expect(ctrlScope.builds[0].buildNumber).toBe(1);
		expect(ctrlScope.builds[0].phase).toBe('queued');
		expect(ctrlScope.builds[0].status).toBe('Finished');
		expect(ctrlScope.builds[0].lastAuthorEmail).toBe('hjd@afhj.com');
		expect(ctrlScope.builds[0].triggeredByAccount).toBe('thecccount');
		
		//Can add more checks here to validate if test data is assigned in the controller's scope
	});

	it('should call deleteBuildByBuildNumber when delete button is clicked', function(){
		httpBackend.flush();
		expect(buildsService.getBuildsByProjectId).toHaveBeenCalled();

        httpBackend.expect('DELETE', config.MW_URL + '/projects/'+ testData.projectIdDELParam + '/builds/' + testData.testBuildNumber)
        .respond(200, 'OK');
        httpBackend.expect('GET',config.MW_URL+'/projects/'+testData.testProjectId+'/builds')
					.respond(200,testData.testProjectData);
httpBackend.expect('GET',
					config.MW_URL+'/projects/'+testData.testProjectId+'/builds/1/artifacts?noredirect=true')
					.respond(200);
        ctrlScope.deleteBuild(testData.testBuildNumber,true);
        httpBackend.flush();
        expect(buildsService.deleteBuildByBuildNumber).toHaveBeenCalled(); 
        expect(buildsService.getBuildsByProjectId).toHaveBeenCalled();      
    });

    it('should add error message if build cannot be deleted',function() {
	httpBackend.flush();
		expect(buildsService.getBuildsByProjectId).toHaveBeenCalled();

        httpBackend.expect('DELETE', config.MW_URL + '/projects/'+ testData.projectIdDELParam + '/builds/' + testData.testBuildNumber)
        .respond(404);
        httpBackend.expect('GET',config.MW_URL+'/projects/'+testData.testProjectId+'/builds')
					.respond(200,testData.testProjectData);
httpBackend.expect('GET',
					config.MW_URL+'/projects/'+testData.testProjectId+'/builds/1/artifacts?noredirect=true')
					.respond(200);
        ctrlScope.deleteBuild(testData.testBuildNumber,true);
        httpBackend.flush();
        expect(buildsService.deleteBuildByBuildNumber).toHaveBeenCalled(); 
        expect(buildsService.getBuildsByProjectId).toHaveBeenCalled(); 
        expect(ctrlScope.errorsAndMessages).toContain('Error deleting the build..');
    });

    it('should call runBuildByProjectId when Run a build button is clicked', function(){
		httpBackend.flush();
		expect(buildsService.getBuildsByProjectId).toHaveBeenCalled();

        httpBackend.when('POST',config.MW_URL+'/projects/'+testData.testProjectId+'/build')
				.respond(200,testData.postBuildByProjectId);
        httpBackend.expect('GET',config.MW_URL+'/projects/'+testData.testProjectId+'/builds')
					.respond(200,testData.testProjectData);
httpBackend.expect('GET',
					config.MW_URL+'/projects/'+testData.testProjectId+'/builds/1/artifacts?noredirect=true')
					.respond(200);
        ctrlScope.runBuild(true);
        httpBackend.flush();
        expect(buildsService.runBuildByProjectId).toHaveBeenCalled(); 
        expect(buildsService.getBuildsByProjectId).toHaveBeenCalled();      
    });
	
	it('should change the path to /projects/projectId/builds/buildNumber',function() {
		ctrlScope.getBuildDetails(testData.testBuildNumber);
		expect(location.path()).toBe('/projects/'+testData.testProjectId + '/builds/' + testData.testBuildNumber);
	});

	it('should execute downloading of build artifacts',function() {

	});
});
