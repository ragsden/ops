describe('BuildController',function() {
	var ctrlScope;
	var buildsService;
	var ctrl;
	var routeParams;
	var httpBackend;
	var _location;
	beforeEach(function() {
		module('angSpa');
		inject(function($rootScope,$routeParams,$httpBackend,$controller,BuildsService) {
			ctrlScope = $rootScope.$new();
			buildsService = BuildsService;			
			httpBackend = $httpBackend;
			routeParams = $routeParams;

			routeParams.projectId = testData.testProjectId;
			routeParams.buildNumber = testData.testBuildNumber;
			spyOn(buildsService,'getConsoleByBuildNo').andCallThrough();			
			
			ctrl = $controller('buildController',
				{
					$scope: ctrlScope,
					buildsService: BuildsService,
					$routeParams:routeParams,
					}
			 );
			 });
	});
	it('should call getConsoleByBuildNo ',function() {
		httpBackend.expectGET(config.MW_URL+'/projects/'+testData.testProjectId+'/builds/' + testData.testBuildNumber + "/console")
		.respond(200,testData.testBuildData.console);
        httpBackend.flush();
		expect(buildsService.getConsoleByBuildNo).toHaveBeenCalled();		
	});
    it('should handle error in case build number could not be fetched',function() {
	httpBackend.expectGET(config.MW_URL+'/projects/'+testData.testProjectId+'/builds/' + testData.testBuildNumber + "/console")
		.respond(404);
		httpBackend.flush();
		expect(buildsService.getConsoleByBuildNo).toHaveBeenCalled();	
        expect(ctrlScope.err).toEqual('Error getting the Console Output.');
    });
});
