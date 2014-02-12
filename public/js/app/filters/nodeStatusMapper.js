angular.module('angSpa').filter('mapToNodeStatus',function() {
  var nodeStatusMessages = [
                                        'QUEUED',
                                        'NODE_READY',
                                        'ADMIN_READY',
                                        'ADMIN_STOPPED',
                                        'WORKER_READY',
                                        'WORKER_STOPPED',
                                        'NODE_FAILURE',
                                        'NODE_STOPPED',
                                        'USER_SETUP',
                                        'USER_SETUP_FAILED',
                                        'BUILD_IN_PROGRESS',
                                        'REMOVE_QUEUED',
                                        'REMOVE_FAILED',
                                        'REMOVED',
                                        'NODE_FAILURE_LIMIT'
                                      ];

  return function(v) {
    if(v > nodeStatusMessages.length-1) {  return ""; }
    else {
      return nodeStatusMessages[v];
    }
  };
});
