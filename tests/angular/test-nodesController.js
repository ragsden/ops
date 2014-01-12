describe('NodesController',function() {
	var ctrlScope;
	var nodeService;
	var nodeTypeService;
	var ctrl;
	var routeParams;
	var httpBackend;
	beforeEach(function() {
		module('angSpa');

		inject(function($rootScope,$httpBackend,$routeParams,$controller,NodeService,NodeTypeService) {
		ctrlScope = $rootScope.$new();
		nodeService = NodeService;
		nodeTypeService = NodeTypeService;
		routeParams = $routeParams;
		httpBackend = $httpBackend;
		var spy = spyOn(nodeService,'getNodesBySubscriptionId').andCallThrough();
		spyOn(nodeTypeService,'getAllNodeTypes').andCallThrough();

		routeParams.subscriptionId = testData.subscriptionNodesGETParameter;


		httpBackend.expect('GET',config.MW_URL+'/nodetypes')
				.respond(200,testData.nodeTypesGET);

		httpBackend.expect('GET',config.MW_URL+'/subscriptions/'+testData.subscriptionNodesGETParameter+'/nodes')
				.respond(200,testData.subscriptionNodesGET);

		
		ctrl = $controller('nodesController',
			{
				$scope: ctrlScope, 
				$routeParams:routeParams,
				NodeService:nodeService,
				NodeTypeService: nodeTypeService }
				)	;

		
		});
	});
	
	it('should call getNodesBySubscriptionId and getAllNodeTypes when the controller is created',function() {
		expect(nodeTypeService.getAllNodeTypes).toHaveBeenCalled();
		expect(nodeService.getNodesBySubscriptionId).toHaveBeenCalled();
		
		httpBackend.flush();
	});
});