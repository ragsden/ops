//Testing controllers... 
describe('NodesController',function() {
	var ctrlScope;
	var nodeService;
	var nodeTypeService;
	var ctrl;
	var routeParams;
	var httpBackend;
	beforeEach(function() {
		module('angSpa');
		//Need to inject all required dependencies to setup the test
		inject(function($rootScope,$httpBackend,$routeParams,$controller,NodeService,NodeTypeService) {
			//Create a new scope so that we can inspect the controller's $scope.
			ctrlScope = $rootScope.$new();
			nodeService = NodeService;
			nodeTypeService = NodeTypeService;
			routeParams = $routeParams;
			httpBackend = $httpBackend;

			//spy on the service API calls, and monitor them, but let them execute.
			//We just want to check if they are used in the controller
			spyOn(nodeService,'getNodesBySubscriptionId').andCallThrough();
			spyOn(nodeService,'createNodeForSubscriptionId').andCallThrough();
			spyOn(nodeService,'deleteNodeById').andCallThrough();
			spyOn(nodeTypeService,'getAllNodeTypes').andCallThrough();
			

			routeParams.subscriptionId = testData.subscriptionNodesGETParameter;

			//Since the controller calls these APIs we expect to get some data back
			//The services actually mock out the backend service, here we just want to check
			//the API call and its output.
			httpBackend.expect('GET',config.MW_URL+'/nodetypes')
					.respond(200,testData.nodeTypesGET);
			httpBackend.expect('GET',config.MW_URL+'/subscriptions/'+testData.subscriptionNodesGETParameter+'/nodes')
					.respond(200,testData.subscriptionNodesGET);

			//create the controller. The parameters are the same as used in the actual controller.
			ctrl = $controller('nodesController',
				{
					$scope: ctrlScope, 
					$routeParams:routeParams,
					NodeService:nodeService,
					NodeTypeService: nodeTypeService }
					);

			
			});
	});
	
	it('should call getNodesBySubscriptionId and getAllNodeTypes when the controller is created',function() {
		expect(nodeTypeService.getAllNodeTypes).toHaveBeenCalled();
		expect(nodeService.getNodesBySubscriptionId).toHaveBeenCalled();
		
		httpBackend.flush();

		expect(ctrlScope.nodes.length).toBe(1);
		expect(ctrlScope.nodeTypes.length).toBe(2);
		//console.log('Sel ' +ctrlScope.selectedNodeId);
		//Can add more checks here to validate if test data is assigned in the controller's scope
	});

	it('should call createNodeForSubscriptionId of nodeService',function() {
		//Positive Test: If this POST gets called, we expect a 200 response.
		ctrlScope.selectedNodeId = testData.nodeTypesGET[0].id;
		httpBackend.expectPOST(config.MW_URL+'/nodes', 
			{ nodeType : testData.nodeTypesGET[0].id, subscriptionId: testData.subscriptionNodesGETParameter})
			.respond(202);
		ctrlScope.addNode();
		httpBackend.flush();
		expect(nodeService.createNodeForSubscriptionId).toHaveBeenCalled();
		//After httpBackend is flushed, based on the we should have data in the ctrlScope
		//We just check here if the correct status has been checked.
		expect(ctrlScope.errorsAndMessages[0]).toBe('The container has been queued for provisioning');

	});

	it('should call deleteNode for a container',function() {
		httpBackend.expectDELETE(
			config.MW_URL+'/nodes/'+testData.subscriptionNodesGET[0].id)
		.respond(202);

		ctrlScope.deleteNode(testData.subscriptionNodesGET[0].id);
		httpBackend.flush();
		expect(nodeService.deleteNodeById).toHaveBeenCalled();
	});
});