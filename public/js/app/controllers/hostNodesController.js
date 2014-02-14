/*jshint -W040 */
/*jshint -W055 */
/*jshint -W083 */

angular.module('angSpa').controller('hostNodesController',['$scope','$filter','$location','DockerHostService','NodesInfoService','$routeParams',function($scope,$filter,$location,DockerHostService,NodesInfoService,$routeParams) {
  $scope.nodes = [];
  $scope.messages = [];
  function nodesDataObject(id,subscriptionId,vmName,nodeType,nodeState,created,updated,latestProjectRun,latestBuildRun,latestBuildStatus,latestBuildTime){
    this._id = id;
    this.subscriptionId = subscriptionId;
    this.vmName = vmName;
    this.nodeType = nodeType;
    this.nodeState = nodeState;
    this.created = created;
    this.updated = updated;
    this.latestProjectRun = latestProjectRun;
    this.latestBuildRun = latestBuildRun;
    this.latestBuildStatus = latestBuildStatus;
    this.latestBuildTime = latestBuildTime;
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
                var latestBuildRun = "";
                var latestProjectRun = "";
                var latestBuildStatus = "";
                var latestBuildTime = "";
                if(!err){
                  if(nodeData.length !== 0)
                  {
                      nodeData = $filter('orderBy')(nodeData,'loggedAt');
                      var lastObjectIndex = nodeData.length - 1;
                      var metaData = JSON.parse(nodeData[lastObjectIndex].meta);
                      latestBuildRun = metaData.BuildNumber;
                      latestProjectRun = metaData.JobId;
                      latestBuildStatus = metaData.Status;
                      latestBuildTime = metaData.Time * 1000;
                  }
                  console.log(obj);
                  var nodesData = new nodesDataObject(obj._id,
                                                      obj.subscriptionId,
                                                      obj.vmName,
                                                      obj.nodeType,
                                                      obj.nodeState,
                                                      obj.created,
                                                      obj.updated,
                                                      latestProjectRun,
                                                      latestBuildRun,
                                                      latestBuildStatus,
                                                      latestBuildTime
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
$scope.showLastBuildPage = function(projectId, buildNo)
{
  $location.path("/projects/"+projectId+"/builds/" + buildNo);
};
$scope.showLastProjectPage = function(projectId)
{
  $location.path("/projects/"+projectId + "/builds");
};
}]);

