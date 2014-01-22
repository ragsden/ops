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
   };
   return new BuildsService();

});