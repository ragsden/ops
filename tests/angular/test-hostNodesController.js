/* jshint ignore:start */

describe('DockerHostsController',function() {
  var ctrlScope;
  var dockerHostService;
  var routeParams;
  var ctrl;
  var httpBackend;
  beforeEach(function() {
    module('angSpa');
    //Need to inject all required dependencies to setup the test
    inject(function($rootScope,$httpBackend,$controller,$routeParams,DockerHostService) {
      //Create a new scope so that we can inspect the controller's $scope.
      ctrlScope = $rootScope.$new();
      routeParams = $routeParams;
      dockerHostService = DockerHostService;
      httpBackend = $httpBackend;
      routeParams.hostId = testData.testHostId;
      //spy on the service API calls, and monitor them, but let them execute.
      //We just want to check if they are used in the controller
      spyOn(dockerHostService,'getNodesByHostId').andCallThrough();

      //Since the controller calls these APIs we expect to get some data back
      //The services actually mock out the backend service, here we just want to check
      //the API call and its output.
      httpBackend.expect('GET',config.MW_URL+'/hosts/'+testData.testHostId+'/nodes')
      .respond(200,testData.testNodesData);

      //create the controller. The parameters are the same as used in the actual controller.
      ctrl = $controller('hostNodesController', { $scope: ctrlScope,$routeParams : routeParams,  DockerHostService:dockerHostService });
    });
  });

  it('should call getAll from DockerHostService when the controller is created',function() {
    expect(dockerHostService.getNodesByHostId).toHaveBeenCalled();

    httpBackend.flush();

    expect(ctrlScope.nodes.length).toBe(2);
  });

});
/* jshint ignore:end */

