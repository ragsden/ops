/* jshint ignore:start */

describe('Hosts Page',function() {
	var httpBackend;
	var dockerHostService;
	beforeEach(function() {
		module('angSpa');
		inject(function($httpBackend,DockerHostService) {
			httpBackend = $httpBackend;
			httpBackend.when('GET',config.MW_URL+'/hosts')
			.respond(200,testData.dockerHosts);

			httpBackend.when('GET',config.MW_URL+'/hosts/'+testData.testHostId+'/nodes')
			.respond(200,testData.testNodesData);


			dockerHostService = DockerHostService;
			
		});

		
	});
	describe('Docker Host Service',function() {
		
		it('gets data for all docker hosts',function() {
			var result ;
			//Call the service
			dockerHostService.getAll(function(err,data) {
				result = data;
			});

			httpBackend.flush();

			//Make sure that the http call inside the method returns the data that we have given
			//as part of tests
			expect(result.length).toBe(1);
			//Check if the result of the service call matches the data expected.
			expect(result[0].id).toBe(testData.dockerHosts[0].id);
			expect(result[0].vmName).toBe(testData.dockerHosts[0].vmName);
			
		});

        it('gets nodes information for a host Id',function() {
            var result ;
			//Call the service
			dockerHostService.getNodesByHostId(testData.testHostId,function(err,data) {
				result = data;
			});

			httpBackend.flush();

			//Make sure that the http call inside the method returns the data that we have given
			//as part of tests
			expect(result.length).toBe(2);
			//Check if the result of the service call matches the data expected.
			expect(result[0]._id).toBe(testData.testNodesData[0]._id);
			expect(result[0].nodeType).toBe(testData.testNodesData[0].nodeType);
            expect(result[0].subscriptionId).toBe(testData.testNodesData[0].subscriptionId);
        });

		afterEach(function() {
		httpBackend.verifyNoOutstandingExpectation();
     	httpBackend.verifyNoOutstandingRequest();
	});
    });
});
/* jshint ignore:end */

