describe('Nodes Info Service',function() {
	var httpBackend;
	var nodesInfoService;
	var bootstrapped = false;
	beforeEach(function() {
		module('angSpa');
		inject(function($httpBackend,NodesInfoService) {
			
 			if(!bootstrapped) {
				httpBackend = $httpBackend;
				httpBackend.when('GET',config.MW_URL+'/nodeInfo/'+testData.testNodesData[0]._id)
				.respond(200,testData.testNodesInfoData);
				httpBackend.when('GET',config.MW_URL+'/nodeInfo/'+testData.testNodesData[1]._id)
				.respond(200,null);
				nodesInfoService = NodesInfoService;
				bootstrapped = true;
					}
		});
		
	});
	describe('Nodes Info Service',function() {
		it('gets the node info by nodeID',function() {
			var result ;			
			nodesInfoService.getNodeInfoByNodeId(testData.testNodesData[0]._id,function(err,data) {
				result = data;
			});
			httpBackend.flush();
			expect(result[0].nodeId).toBe("12f37e2fbe2c170f008c4ed0");
			expect(result[0].loggedAt).toBe("1392195983");
		});

		it('checks for null result for invalid nodeId',function() {
			var result ;					
			nodesInfoService.getNodeInfoByNodeId(testData.testNodesData[1]._id,function(err,data) {
				result = data;
			});
			httpBackend.flush();
			expect(result).toBe(null);
		   });
	});
		afterEach(function() {
		httpBackend.verifyNoOutstandingExpectation();
     	httpBackend.verifyNoOutstandingRequest();
	});
});