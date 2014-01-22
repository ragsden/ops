//Testing controllers... 
describe('ProjectsController',function() {
	var ctrlScope;
	var projectsService;
	var ctrl;
	var routeParams;
	var httpBackend;
	var _location;
	beforeEach(function() {
		module('angSpa');
		inject(function($rootScope,$routeParams,$httpBackend,$controller,ProjectsService) {
			ctrlScope = $rootScope.$new();
			projectsService = ProjectsService;			
			httpBackend = $httpBackend;
			routeParams = $routeParams;

			routeParams.subscriptionId = testData.subscriptionProjectsGETParam;
			spyOn(projectsService,'getProjectsBySubscriptionId').andCallThrough();
			spyOn(projectsService,'deleteProjectById').andCallThrough();
			spyOn(projectsService,'deleteBuildsByProjectId').andCallThrough();			
			
			ctrl = $controller('projectsController',
				{
					$scope: ctrlScope, 
					$location: _location,
					ProjectsService: projectsService,
					}
			 );
			 });
	});
	
	it('should call getProjectsBySubscriptionId of ProjectsService ',function() {
		httpBackend.expectGET(config.MW_URL+'/subscriptions/'+testData.subscriptionProjectsGETParam+'/projects')
		.respond(200,testData.subscriptionProjectsGET);
		httpBackend.flush();
		expect(projectsService.getProjectsBySubscriptionId).toHaveBeenCalled();
		expect(ctrlScope.projectsModel.projects[0].id).toBe('52d7c18af0412511007af7f7');		
		expect(ctrlScope.projectsModel.projects[0].name).toBe('boto:2.0_stable');
		expect(ctrlScope.projectsModel.projects[0].permissions[0].account).toBe('1234567890qwertyuiopasdf');
	});


	it('should call deleteProjectById when delete button clicked', function(){
		httpBackend.expectGET(config.MW_URL+'/subscriptions/'+testData.subscriptionProjectsGETParam+'/projects')
		.respond(200,testData.subscriptionProjectsGET);
		httpBackend.flush();
		expect(projectsService.getProjectsBySubscriptionId).toHaveBeenCalled();


        httpBackend.expect('DELETE', config.MW_URL + '/projects/'+ testData.projectIdDELParam)
        .respond(200, 'OK');
        httpBackend.expect('GET', config.MW_URL + '/subscriptions/' + testData.subscriptionProjectsGETParam +'/projects')
	    .respond(200, testData.subscriptionProjectsGET);
		       
        //Call the delete function in the controller
        ctrlScope.deleteProject(testData.projectIdDELParam);

        //flush the http requests
        httpBackend.flush();

        //expect them in this order
        expect(projectsService.deleteProjectById).toHaveBeenCalled();
        expect(projectsService.getProjectsBySubscriptionId).toHaveBeenCalled();        
    });
	
	it('should call deleteBuildsByProjectId when delete all builds button is clicked', function(){
		httpBackend.expectGET(config.MW_URL+'/subscriptions/'+testData.subscriptionProjectsGETParam+'/projects')
		.respond(200,testData.subscriptionProjectsGET);
		httpBackend.flush();
		expect(projectsService.getProjectsBySubscriptionId).toHaveBeenCalled();

        httpBackend.expect('DELETE', config.MW_URL + '/projects/'+ testData.projectIdDELParam + '/builds')
        .respond(200, 'OK');
        ctrlScope.deleteBuilds(testData.projectIdDELParam);
        httpBackend.flush();
        expect(projectsService.deleteBuildsByProjectId).toHaveBeenCalled();       
    });
});