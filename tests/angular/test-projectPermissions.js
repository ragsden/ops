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
  var filterAccounts;
  beforeEach(function() {
    module("angSpa");
    inject(function($rootScope,$controller,$httpBackend,$modal,ProjectsService, AccountsService, $filter, filterAccountsByUsernameFilter) {

      console.log(filterAccountsByUsernameFilter);

      ctrlScope = $rootScope.$new();

      projectsService = ProjectsService;
      accountsService = AccountsService;
      filter = $filter;
      filterAccounts = filterAccountsByUsernameFilter;
      httpBackend = $httpBackend;
      var fakeModal = {
      };

      spyOn($modal,'open').andReturn(fakeModal);

      spyOn(ProjectsService,'getProjectByProjectId').andCallThrough();
      spyOn(AccountsService,'getAccountById').andCallThrough();
      spyOn(AccountsService,'searchAccountsByUsername').andCallThrough();
      spyOn(ProjectsService,'updateProjectByProjectId').andCallThrough();

      var modalInstance = $modal.open();
      ctrl = $controller('projectPermissionsModalController',
                         {
                           $scope: ctrlScope, 
                           $modalInstance: modalInstance,
                           ProjectsService: projectsService,
                           AccountsService: accountsService,
                           dataToPermissionsModal: data,
                           $filter : filter,
                           filterAccountsByUsernameFilter : filterAccounts
                         }
                        ); 

    });
  });

  it('should get account information for a given project',function() {
    httpBackend.expectGET(config.MW_URL+'/projects/'+ testData.projectIdGETParam)
    .respond(200,testData.projectGETByProjectId);
    httpBackend.expectGET(config.MW_URL+'/accounts/' + testData.projectGETByProjectId.permissions[0].account)
    .respond(200,testData.accountGET);

    httpBackend.flush();
    expect(ctrlScope.projectUpdate.name).toBe(testData.projectGETByProjectId.name);
  });

  it('call update project service when update function in controller activated',function() {
    httpBackend.expectGET(config.MW_URL+'/projects/' + testData.projectIdGETParam)
    .respond(200,testData.projectGETByProjectId);
    httpBackend.expectGET(config.MW_URL+'/accounts/' + testData.projectGETByProjectId.permissions[0].account)
    .respond(200,testData.accountGET);

    httpBackend.flush();
    expect(ctrlScope.projectUpdate.name).toBe(testData.projectGETByProjectId.name);

    ctrlScope.collaborators = testData.collaboratorsUpdate;
    
    httpBackend.expectPOST(config.MW_URL+'/projects/' + testData.projectUpdate)
    .respond(200,testData.projectUpdateReturns);
    ctrlScope.updateProject();

    expect(ctrlScope.projectUpdate.permissions.length).toBe(2);
    expect(ctrlScope.projectUpdate.permissions.identities).toBe(undefined);
   
  });


  it('should update the project with the new collaborator(testUser) added', function(){
    httpBackend.expectGET(config.MW_URL+'/projects/' + testData.projectIdGETParam)
    .respond(200,testData.projectGETByProjectId);
    httpBackend.expectGET(config.MW_URL+'/accounts/' + testData.projectGETByProjectId.permissions[0].account)
    .respond(200,testData.accountGET);

    httpBackend.flush();
    expect(ctrlScope.projectUpdate.name).toBe(testData.projectGETByProjectId.name);

    
    httpBackend.expectGET(config.MW_URL+'/accounts/' + testData.newCollaboratorUsername)
    .respond(200,testData.accountsGET);
    
    ctrlScope.addNewCollaborator(testData.newCollaboratorUsername);

    var filterOp= filterAccounts(testData.projectGETByProjectId.repositoryProvider, testData.newCollaboratorUsername, testData.accountsGET);
    //We are now expecting a spliced result with one object from
    //the original test data
    expect(testData.accountsGET.length).toBe(1);
    expect(filterOp.id).toBe('1234567890qwertyuiopasd2');

   

   
  });


});
/*jshint ignore:end */
