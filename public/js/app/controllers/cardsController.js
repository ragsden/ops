'use strict';

var CardsController = function($scope,$location,$routeParams,CardsService) {
  $scope.cardsModel={   
    card :{
         id: "",
         cardNumber: "",
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
  }
   $scope.goBack = function(){
    window.history.back();
  };
  $scope.init();
};
CardsController.$inject = ["$scope","$location","$routeParams","CardsService"];
angSpa.controller("cardsController",CardsController);