angSpa.factory('plansService',function($http){
 var middlewareUrl = config.MW_URL;
  var plansService = function(){
     plansService.prototype.getPlanByPlanId = function(planId, done){
        var planUrl = middlewareUrl + "/plans/" + planId ;
        $http({ method: 'GET', url: planUrl}).
        success(function(data, status, headers, config) {
          done(null,data);
        }).
        error(function(data, status, headers, config) {
          var message = "error getting plan information using planId";
          done(message, null);
        });
     };
 };
   
 return new plansService();

});
