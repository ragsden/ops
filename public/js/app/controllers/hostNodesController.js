/*jshint -W040 */
/*jshint -W055 */
/*jshint -W083 */

angular.module('angSpa').controller('hostNodesController',['$scope','DockerHostService','NodesInfoService','$routeParams',function($scope,DockerHostService,NodesInfoService,$routeParams) {
  $scope.nodes = [];
  $scope.messages = [];
  function nodesDataObject(id,vmName,nodeType,nodeState,created,updated){
    this._id = id;
    this.vmName = vmName;
    this.nodeType = nodeType;
    this.nodeState = nodeState;
    this.created = created;
    this.updated = updated;
  }
  DockerHostService.getNodesByHostId($routeParams.hostId,function(err,data) {
        if(err) {
          $scope.messages.push('Error getting node information for host ' + err);
        }
        else {
         if(data.length === 0 ) {
           $scope.messages.push('No nodes found for this host');
         }
         else
         {
         for(var i=0; i < data.length; i++) {
          var j = i;
          NodesInfoService.getNodeInfoByNodeId(data[j]._id, function(err, nodeData){
            if(!err){
              if(nodeData.length !== 0){
              console.log(nodeData);}
              var nodesData = new nodesDataObject(data[j]._id,
                                                  data[j].vmName,
                                                  data[j].nodeType,
                                                  data[j].nodeState,
                                                  data[j].created,
                                                  data[j].updated
                                                  );
              $scope.nodes.push(nodesData);
            }
          });
        }
      }

        }
  });
}]);

