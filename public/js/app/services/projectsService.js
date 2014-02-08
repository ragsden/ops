angSpa.factory('ProjectsService',function($http){
 var middlewareUrl = config.MW_URL;
 var ProjectsService = function(){
     ProjectsService.prototype.getProjectsBySubscriptionId = function(subscriptionId, done){
        var getProjectsUrl = middlewareUrl + "/subscriptions/" + subscriptionId + "/projects";
        $http({ method: 'GET', url: getProjectsUrl}).
        success(function(data, status, headers, config) {
          done(null,data);
        }).
        error(function(data, status, headers, config) {
          done(status);
        });
     };

     ProjectsService.prototype.deleteProjectById = function(projectId, done){
        var deleteProjectUrl = middlewareUrl + "/projects/" + projectId;
        $http({ method: 'DELETE', url: deleteProjectUrl}).
        success(function(data, status, headers, config) {
          done(status, data);
        }).
        error(function(data, status, headers, config) {
          done(status, data);
        });
     };

     ProjectsService.prototype.deleteBuildsByProjectId = function(projectId){
        var deleteBuildsUrl =  middlewareUrl + "/projects/" + projectId + "/builds";
        return $http({ method: 'DELETE', url: deleteBuildsUrl});
     };

   };
   return new ProjectsService();

});