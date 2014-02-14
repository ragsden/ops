/*jshint ignore:start */
describe('projectPermissions',function() {
  var data = 
    { 
    projectId : testData.projectIdGETParam 
  };
  var ctrlScope;
  var filter;
  var ctrl;
  var projectsService;
  var accountsService;
  var httpBackend;
  beforeEach(function() {
    module("angSpa");
    inject(function($rootScope,$controller,$httpBackend,$modal,ProjectsService, AccountsService, $filter) {

      ctrlScope = $rootScope.$new();

      projectsService = ProjectsService;
      accountsService = AccountsService;
      filter = $filter;
      httpBackend = $httpBackend;
      var fakeModal = {
      };

      spyOn($modal,'open').andReturn(fakeModal);

      spyOn(ProjectsService,'getProjectByProjectId').andCallThrough();
      spyOn(AccountsService,'getAccountById').andCallThrough();

      var modalInstance = $modal.open();
      ctrl = $controller('projectPermissionsModalController',
                         {
                           $scope: ctrlScope, 
                           $modalInstance: modalInstance,
                           ProjectsService: projectsService,
                           AccountsService: accountsService,
                           dataToPermissionsModal: data,
                           $filter: filter
                         }
                        ); 

    });
  });

  it('gets account information for a given project',function() {
    httpBackend.expectGET(config.MW_URL+'/projects/'+testData.projectIdGETParam)
		.respond(200,testData.projectGETByProjectId);
httpBackend.expectGET(config.MW_URL+'/accounts/1234567890qwertyuiopasdf')
		.respond(200,testData.accountsGET[0]);

		httpBackend.flush();


        expect(ctrlScope.projectUpdate.name).toBe(testData.projectGETByProjectId.name);

  });
});
/*jshint ignore:end */
