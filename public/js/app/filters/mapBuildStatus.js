angular.module('angSpa').filter('mapBuildStatus',function() {
  var buildStatusMessages = [
                                        'Unknown',
                                        'Success',
                                        'Failure',
                                        'Unstable',
                                        'InProgress'
                                      ];

  return function(v) {
    if(v > buildStatusMessages.length-1) {  return ""; }
    else {
      return buildStatusMessages[v];
    }
  };
});
