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

     ProjectsService.prototype.getProjectByProjectId = function(projectId, done){
        var getProjectUrl = middlewareUrl + "/projects/" + projectId;
        $http({method: 'GET', url: getProjectUrl})
        .success(function(data, status, headers, config){
          done(null, data);
        })
        .error(function(data, status, headers, config){
          done(data, null);
        });
     };

     ProjectsService.prototype.updateProjectByProjectId = function(projectId, projectUpdate, done){
        var putProjectUrl = middlewareUrl + "/projects/" + projectId;
        console.log(projectUpdate);
        $http({method: 'PUT', url: putProjectUrl, data: projectUpdate})
        .success(function(data, status, headers, config){
          done(status, data);
        })
        .error(function(data, status, headers, config){
          done(status, data);
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

     ProjectsService.prototype.deleteBuildsByProjectId = function(projectId, done){
        var deleteBuildsUrl = middlewareUrl + "/projects/" + projectId + "/builds";
        $http({ method: 'DELETE', url: deleteBuildsUrl}).
        success(function(data, status, headers, config) {
          done(status, data);
        }).
        error(function(data, status, headers, config) {
          done(status, data);
        });
     };

   };
   return new ProjectsService();

});
