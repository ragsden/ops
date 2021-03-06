angSpa.factory('BuildsService',function($http){
  var middlewareUrl = config.MW_URL;
  var BuildsService = function(){
    BuildsService.prototype.getBuildsByProjectId = function(projectId, done){
      var buildsInfoUrl = middlewareUrl+"/projects/"+projectId+"/builds";
      $http(
        {
        method: 'GET',
        url: buildsInfoUrl
      })
      .success(function(data,status,header,config) {
        done(null,data);
      }).error(function(data,status,headers,config) {
        done(status,data);
      });
    };

    BuildsService.prototype.deleteBuildByBuildNumber = function(projectId,buildNumber, done){
      var deleteBuildUrl = middlewareUrl + "/projects/" + projectId + "/builds/" + buildNumber;
      $http({ method: 'DELETE', url: deleteBuildUrl}).
        success(function(data, status, headers, config) {
        done(status, data);
      }).
        error(function(data, status, headers, config) {
        done(status, data);
      });
    };

    BuildsService.prototype.runBuildByProjectId = function(projectId, done){
        var runBuildUrl = middlewareUrl + "/projects/" + projectId + "/build";
        $http({ method: 'POST', url: runBuildUrl}).
        success(function(data, status, headers, config) {
          done(status, data);
        }).
        error(function(data, status, headers, config) {
          done(status, data);
        });
     };
    BuildsService.prototype.getConsoleByBuildNo = function(projectId, buildNumber, done){
        var getConsoleUrl = middlewareUrl + "/projects/" + projectId + "/builds/" + buildNumber + "/console";
        $http({ method: 'GET', url: getConsoleUrl}).
        success(function(data, status, headers, config) {
          done(null, data);
        }).
        error(function(data, status, headers, config) {
          done(status, data);
        });
     };
   };
   BuildsService.prototype.getBuildArtifact = function(projectId,buildNumber,done) {
      var url = middlewareUrl + "/projects/" + projectId + "/builds/" + buildNumber+"/artifacts?noredirect=true";
   $http({ method: 'GET', url: url }).
        success(function(data, status, headers, config) {
          done(null, data);
        }).
        error(function(data, status, headers, config) {
          done(status, data);
        });

   };
   BuildsService.prototype.getById = function(projectId,buildNumber,done) {
      var url = middlewareUrl + "/projects/" + projectId + "/builds/" + buildNumber;
      $http({ method: 'GET', url: url }).
        success(function(data, status, headers, config) {
          done(null, data);
        }).
        error(function(data, status, headers, config) {
          done(status, data);
        });

   };
return new BuildsService();

});
