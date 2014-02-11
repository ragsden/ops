angular.module('angSpa').factory('NodesInfoService',function($http) {
  var middlewareUrl = config.MW_URL;
  var NodesInfoService = function() {
    NodesInfoService.prototype.getNodeInfoByNodeId = function(nodeId,done) {
     var getNodeInfoUrl = middlewareUrl + "/nodeInfo/" + nodeId;
    // var requestData = { start : , end : };
          $http({
            method: 'GET',
            url: getNodeInfoUrl,
       //     data : requestData
          })
          .success(function(data,status,header,config) {
            done(null,data);
          }).error(function(data,status,headers,config) {
            done(status,data);
          });
    };
  };

  return new NodesInfoService();
});