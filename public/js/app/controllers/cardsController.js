'use strict';

var CardsController = function($scope,$location,$routeParams,CardsService) {
  $scope.cardsModel={
      card: {
        id: "",
        lastFourDigits: "",
        expiry: "",
        type: "",
    },
    err:";"
  };
  $scope.init = function()
  {
    CardsService.getCardById($routeParams.cardId,function(err,data){
     if(err)
      {
        $scope.cardsModel.err = 'Error getting the Card Information.';
      }
      else
        {
          $scope.cardsModel.card = data;
        }

    });
  };
  $scope.init();
};
CardsController.$inject = ["$scope","$location","$routeParams","CardsService"];
angSpa.controller("cardsController",CardsController);
