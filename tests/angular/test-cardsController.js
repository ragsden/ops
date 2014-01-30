describe('CardsController',function() {
	var ctrlScope;
	var cardsService;
	var ctrl;
	var routeParams;
	var httpBackend;
	beforeEach(function() {
		module('angSpa');
		inject(function($rootScope,$httpBackend,$routeParams,$controller,CardsService) {
			ctrlScope = $rootScope.$new();
			cardsService = CardsService;
			routeParams = $routeParams;
			httpBackend = $httpBackend;
			spyOn(cardsService,'getCardById').andCallThrough();
			routeParams.cardId = testData.testCardId;

			ctrl = $controller('cardsController',
				{
					$scope: ctrlScope,
					CardsService: cardsService,
					}
			 );
			 });
	});
	it('should call getCardById of CardsService ',function() {
		httpBackend.expectGET(config.MW_URL+'/cards/'+testData.testCardId)
		.respond(200,testData.testCardData);
		httpBackend.flush();
		expect(cardsService.getCardById).toHaveBeenCalled();
		expect(ctrlScope.cardsModel.card.id).toBe('312f1f77bcf86cd799439011');
	});
});