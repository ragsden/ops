angSpa.factory('CardsService',function($http){
  var middlewareUrl = config.MW_URL;
  var CardsService = function(){
  	CardsService.prototype.getCardById = function(cardId,done){
          var getCardByIdUrl = middlewareUrl + "/cards/" + cardId;
          $http({method: 'GET', url: getCardByIdUrl}).
            success(function(data,status,header,config) {
            done(null,data);
          }).error(function(data,status,headers,config) {
            done(status,data);
          });
  };

  };
  return new CardsService();
});