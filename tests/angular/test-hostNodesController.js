/* jshint ignore:start */

describe('DockerHostsController',function() {
  var ctrlScope;
  var dockerHostService;
  var nodesInfoService;
  var routeParams;
  var ctrl;
  var httpBackend;
  beforeEach(function() {
    module('angSpa');
    //Need to inject all required dependencies to setup the test
    inject(function($rootScope,$httpBackend,$controller,$routeParams,DockerHostService,NodesInfoService) {
      //Create a new scope so that we can inspect the controller's $scope.
      ctrlScope = $rootScope.$new();
      routeParams = $routeParams;
      dockerHostService = DockerHostService;
      nodesInfoService = NodesInfoService;
      httpBackend = $httpBackend;
      routeParams.hostId = testData.testHostId;
      //spy on the service API calls, and monitor them, but let them execute.
      //We just want to check if they are used in the controller
      spyOn(dockerHostService,'getNodesByHostId').andCallThrough();
      spyOn(nodesInfoService,'getNodeInfoByNodeId').andCallThrough();

      //Since the controller calls these APIs we expect to get some data back
      //The services actually mock out the backend service, here we just want to check
      //the API call and its output.
      httpBackend.expect('GET',config.MW_URL+'/hosts/'+testData.testHostId+'/nodes')
      .respond(200,testData.testNodesData);
      httpBackend.expect('GET',config.MW_URL+'/nodeInfo/'+testData.testNodesData[0]._id)
      .respond(200,testData.testNodesInfoData);
      httpBackend.expect('GET',config.MW_URL+'/nodeInfo/'+testData.testNodesData[1]._id)
      .respond(200,testData.testNodesInfoData);

      //create the controller. The parameters are the same as used in the actual controller.
      ctrl = $controller('hostNodesController', 
        { $scope: ctrlScope,
          $routeParams : routeParams, 
         DockerHostService:dockerHostService,
         NodesInfoService : nodesInfoService,
          });
    });
  });

  it('should call getAll from DockerHostService when the controller is created',function() {
    httpBackend.flush();
    expect(dockerHostService.getNodesByHostId).toHaveBeenCalled();
    expect(nodesInfoService.getNodeInfoByNodeId).toHaveBeenCalled();
    expect(nodesInfoService.getNodeInfoByNodeId).toHaveBeenCalled();    

    expect(ctrlScope.nodes.length).toBe(2);
  });

});
/* jshint ignore:end */

