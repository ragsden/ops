//Testing controllers... 
describe('ProjectsController',function() {
	var ctrlScope;
    var modal;
	var projectsService;
	var ctrl;
	var routeParams;
	var httpBackend;
	var _location;
	beforeEach(function() {
		module('angSpa');
		inject(function($rootScope, $modal, $log, $routeParams,$httpBackend,$controller,ProjectsService) { 

			ctrlScope = $rootScope.$new();
            modal = $modal;
			projectsService = ProjectsService;			
			httpBackend = $httpBackend;
			routeParams = $routeParams;
            var fakeModal = {
                result: {
                    then: function(okCallback, closeCallback){
                        this.okCallback = okCallback;
                        this.closeCallback = closeCallback;
                    }
                },
                close: function(){
                    this.result.okCallback();
                },
                dismiss: function(closeString){
                    this.result.closeCallback(closeString);
                }
            };

			routeParams.subscriptionId = testData.subscriptionProjectsGETParam;
			spyOn(projectsService,'getProjectsBySubscriptionId').andCallThrough();
			spyOn(projectsService,'deleteProjectById').andCallThrough();
			spyOn(projectsService,'deleteBuildsByProjectId').andCallThrough();			
			spyOn(projectsService,'getProjectByProjectId').andCallThrough();			
			spyOn(projectsService,'updateProjectByProjectId').andCallThrough();
            spyOn(modal, 'open').andReturn(fakeModal);
			
			ctrl = $controller('projectsController',
				{
					$scope: ctrlScope, 
					$location: _location,
					ProjectsService: projectsService,
                    $modal: modal
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

    it('should check the calls to project permissions modal', function(){
   		httpBackend.expectGET(config.MW_URL+'/subscriptions/'+testData.subscriptionProjectsGETParam+'/projects')
		.respond(200,testData.subscriptionProjectsGET);
		httpBackend.flush();
		expect(projectsService.getProjectsBySubscriptionId).toHaveBeenCalled();
		
        expect(ctrlScope.modalCloseClicked).toEqual(true);

        ctrlScope.editPermissions(testData.projectId);
        expect(ctrlScope.modalCloseClicked).toEqual(false);
        ctrlScope.modalInstance.dismiss('close');
        expect(ctrlScope.modalCloseClicked).toEqual(true);

        httpBackend.expectGET(config.MW_URL+'/subscriptions/'+testData.subscriptionProjectsGETParam+'/projects')
		.respond(200,testData.subscriptionProjectsGET);
		httpBackend.flush();
		expect(projectsService.getProjectsBySubscriptionId).toHaveBeenCalled();
		
        expect(ctrlScope.modalCloseClicked).toEqual(true);
    });















































});
