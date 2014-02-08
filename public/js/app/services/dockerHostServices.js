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

   DockerHostService.prototype.getNodesByHostId = function(hostId,done) {
    var hostNodesUrl = middlewareUrl+"/hosts/"+hostId+"/nodes";
      $http(
        {
        method: 'GET',
        url: hostNodesUrl
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
 
