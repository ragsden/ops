//Testing controllers... 
describe('BuildsController',function() {
	var ctrlScope;
	var buildsService;
	var ctrl;
	var routeParams;
	var httpBackend;
	beforeEach(function() {
		module('angSpa');
		//Need to inject all required dependencies to setup the test
		inject(function($rootScope,$httpBackend,$routeParams,$controller,BuildsService) {
			//Create a new scope so that we can inspect the controller's $scope.
			ctrlScope = $rootScope.$new();
			buildsService = BuildsService;
			routeParams = $routeParams;
			httpBackend = $httpBackend;

			//spy on the service API calls, and monitor them, but let them execute.
			//We just want to check if they are used in the controller
			spyOn(buildsService,'getBuildsByProjectId').andCallThrough();
			spyOn(buildsService,'deleteBuildByBuildNumber').andCallThrough();

			routeParams.projectId = testData.testProjectId;

			//Since the controller calls these APIs we expect to get some data back
			//The services actually mock out the backend service, here we just want to check
			//the API call and its output.
			httpBackend.expect('GET',
					config.MW_URL+'/projects/'+testData.testProjectId+'/builds')
					.respond(200,testData.testProjectData);

			//create the controller. The parameters are the same as used in the actual controller.
			ctrl = $controller('buildsController',
				{
					$scope: ctrlScope, 
					$routeParams:routeParams,
					BuildsService:buildsService
				}
					);

			
			});
	});
	
	it('should call getBuildsByProjectId when the controller is created',function() {

		expect(buildsService.getBuildsByProjectId).toHaveBeenCalled();
		
		httpBackend.flush();

		expect(ctrlScope.builds.length).toBe(1);
		
		expect(ctrlScope.builds[0].buildNumber).toBe(1);
		expect(ctrlScope.builds[0].phase).toBe('Queued');
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
        ctrlScope.deleteBuild(testData.testBuildNumber);
        httpBackend.flush();
        expect(buildsService.deleteBuildByBuildNumber).toHaveBeenCalled(); 
        expect(buildsService.getBuildsByProjectId).toHaveBeenCalled();      
    });
	
});