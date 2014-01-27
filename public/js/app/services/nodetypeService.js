angular.module('angSpa').factory('NodeTypeService',function($http) {
  var middlewareUrl = config.MW_URL;
  var NodeTypeService = function() {
    NodeTypeService.prototype.getAllNodeTypes = function(done) {
      var nodeTypesUrl = middlewareUrl+"/nodetypes";
      $http(
        {
        method: 'GET',
        url: nodeTypesUrl
      })
      .success(function(data,status,header,config) {
        done(null,data);
      }).error(function(data,status,headers,config) {
        done(status,data);
      });

    };
  };
  return new NodeTypeService();
});
