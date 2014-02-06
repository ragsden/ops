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

		afterEach(function() {
		httpBackend.verifyNoOutstandingExpectation();
     	httpBackend.verifyNoOutstandingRequest();
	});
    });
});
/* jshint ignore:end */

