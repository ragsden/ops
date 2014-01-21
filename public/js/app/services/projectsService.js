angSpa.factory('ProjectsService',function($http){
 var middlewareUrl = config.MW_URL;
 var ProjectsService = function(){
     ProjectsService.prototype.getProjectsBySubscriptionId = function(subscriptionId, done){
        var subsUrl = middlewareUrl + "/subscriptions/" + subscriptionId + "/projects";
        $http({ method: 'GET', url: subsUrl}).
        success(function(data, status, headers, config) {
          done(null,data);
        }).
        error(function(data, status, headers, config) {
          done(status);
        });
     };
   };
   return new ProjectsService();

});