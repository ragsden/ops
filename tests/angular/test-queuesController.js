describe('QueuesController',function() {
	var ctrlScope;
	var queuesService;
	var ctrl;
	var routeParams;
	var httpBackend;
	beforeEach(function() {
		module('angSpa');
		inject(function($rootScope,$httpBackend,$routeParams,$controller,QueuesService) {
			ctrlScope = $rootScope.$new();
			queuesService = QueuesService;
			routeParams = $routeParams;
			httpBackend = $httpBackend;
			spyOn(queuesService,'getQueuesBySubId').andCallThrough();
	
            routeParams.subscriptionId = testData.test_subsId;

			ctrl = $controller('queuesController',
				{
					$scope: ctrlScope,
					QueuesService: queuesService,
				}
			 );
			 });
	});
	it('should call getQueuesBySubId of QueuesService ',function() {
		httpBackend.expectGET(config.MW_URL+'/subscriptions/'+testData.test_subsId + '/queues')
		.respond(200,testData.testQueuesData);
		httpBackend.flush();
		expect(queuesService.getQueuesBySubId).toHaveBeenCalled();
		expect(ctrlScope.queuesModel.queues[0].name).toBe('52f87c8813e0c70f00ed6cd1.ubuntu1204');
	});
	
});
