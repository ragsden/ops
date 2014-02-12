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
          data.forEach(function(obj) {
              NodesInfoService.getNodeInfoByNodeId(obj._id, function(err, nodeData){
                if(!err){
                  if(nodeData.length !== 0)
                  {
                  console.log(obj._id);
                  console.log(nodeData);
                  console.log(nodeData[0].meta);
                 //var metaData = JSON.parse(nodeData[0].meta);
                 // console.log(metaData);
                  }
                  var nodesData = new nodesDataObject(obj._id,
                                                      obj.vmName,
                                                      obj.nodeType,
                                                      obj.nodeState,
                                                      obj.created,
                                                      obj.updated
                                                      );
                  $scope.nodes.push(nodesData);
                  
                }
              else
              {
                console.log(err);
                console.log(obj._id);
               }
            });
          });
         }

        }
  });
}]);

