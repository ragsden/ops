describe('Cards Page',function() {
	var httpBackend;
	var cardsService;
	var bootstrapped = false;
	beforeEach(function() {
		module('angSpa');
		inject(function($httpBackend,CardsService) {
			
 			if(!bootstrapped) {
				httpBackend = $httpBackend;
				httpBackend.when('GET',config.MW_URL+'/cards/'+testData.testCardId)
				.respond(200,testData.testCardData);
				httpBackend.when('GET',config.MW_URL+'/cards/'+testData.negtestCardId)
				.respond(200,null);

				cardsService = CardsService;
				bootstrapped = true;
					}
		});
		
	});
	describe('Cards Service',function() {

		it('gets the card info by cardID',function() {
			var result ;			
			cardsService.getCardById(testData.testCardId,function(err,data) {
				result = data;
			});
			httpBackend.flush();
			expect(result.id).toBe(testData.testCardData.id);
			expect(result.cardNumber).toBe(testData.testCardData.cardNumber);
		});

		it('checks for null result for invalid cardId',function() {
			var result ;					
			cardsService.getCardById(testData.negtestCardId,function(err,data) {
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