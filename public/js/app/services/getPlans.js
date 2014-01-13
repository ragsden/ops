angSpa.factory('getPlans',function($http){
 var middlewareUrl = config.MW_URL;
  var GetPlans = function(){
        };
     GetPlans.prototype.getPlanByPlanId = function(planId, done){
     if(config.runMode=="TEST")
       {
        var data= {
                    id: '00000000-0000-0000-0000-00000000000X',
                    name: 'Free',
                    nodesQuota: 1,
                    privateProjectsQuota: 1,
                    storageGigaBytesQuota: 1,
                  };

         done(null,data);
       }
     else
      {
        var planUrl = middlewareUrl + "/plans/" + planId ;
        $http({ method: 'GET', url: planUrl}).
        success(function(data, status, headers, config) {
          done(null,data);
        }).
        error(function(data, status, headers, config) {
          done(data, null);
        });
      }
     };
   return new GetPlans();

});
