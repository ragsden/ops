angular.module('angSpa').factory('DockerHostService',function($http) {
var DockerHostService = function() {
var middlewareUrl = config.MW_URL;

   DockerHostService.prototype.getAll = function(done) {
    var hostsUrl = middlewareUrl+"/hosts";
      $http(
        {
        method: 'GET',
        url: hostsUrl
      })
      .success(function(data,status,header,config) {
        done(null,data);
      }).error(function(data,status,headers,config) {
        done(status,data);
      });
   };
};
return new DockerHostService();
});
 
