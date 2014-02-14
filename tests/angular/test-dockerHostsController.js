/* jshint ignore:start */

describe('DockerHostsController',function() {
  var ctrlScope;
  var dockerHostService;
  var ctrl;
  var httpBackend;
  beforeEach(function() {
    module('angSpa');
    //Need to inject all required dependencies to setup the test
    inject(function($rootScope,$httpBackend,$controller,DockerHostService) {
      //Create a new scope so that we can inspect the controller's $scope.
      ctrlScope = $rootScope.$new();
      dockerHostService = DockerHostService;
      httpBackend = $httpBackend;

      //spy on the service API calls, and monitor them, but let them execute.
      //We just want to check if they are used in the controller
      spyOn(dockerHostService,'getAll').andCallThrough();
      //Since the controller calls these APIs we expect to get some data back
      //The services actually mock out the backend service, here we just want to check
      //the API call and its output.
      //create the controller. The parameters are the same as used in the actual controller.
      ctrl = $controller('dockerHostsController', { $scope: ctrlScope,  DockerHostService:dockerHostService });
    });
  });

  it('should call getAll from DockerHostService when the controller is created',function() {

      httpBackend.expect('GET',config.MW_URL+'/hosts')
      .respond(200,testData.dockerHosts);


    expect(dockerHostService.getAll).toHaveBeenCalled();

    httpBackend.flush();

    expect(ctrlScope.hosts.length).toBe(1);
  });
  it('should call getAll from DockerHostService when the controller is created and handle errors',function() {
          httpBackend.expect('GET',config.MW_URL+'/hosts')
      .respond(500);


    expect(dockerHostService.getAll).toHaveBeenCalled();

    httpBackend.flush();

    expect(ctrlScope.messages).toContain('Error getting docker host information.') ;
  });

  it('should call getAll from DockerHostService when the controller is created and handle no data',function() {
          httpBackend.expect('GET',config.MW_URL+'/hosts')
      .respond(200,[]);


    expect(dockerHostService.getAll).toHaveBeenCalled();

    httpBackend.flush();

    expect(ctrlScope.messages).toContain('No hosts provisioned') ;
  });


});
/* jshint ignore:end */

