angSpa.factory('getPlans',function($http){
 var middlewareUrl = config.MW_URL;
  var getPlans = function(){
     getPlans.prototype.getPlanByPlanId = function(planId, done){
        var planUrl = middlewareUrl + "/plans/" + planId ;
        $http({ method: 'GET', url: planUrl}).
        success(function(data, status, headers, config) {
          done(null,data);
        }).
        error(function(data, status, headers, config) {
          done(data, null);
        });
     };
 };
   
 return new getPlans();

});
