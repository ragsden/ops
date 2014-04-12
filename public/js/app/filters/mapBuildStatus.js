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
}).filter('mapBuildStatusToColor',function() {
var buildStatusMessages = [
                                        'bg-primary',
                                        'bg-success',
                                        'bg-danger',
                                        'bg-warning',
                                        'bg-default'
                                      ];


  return function(s) {
    return buildStatusMessages[s] || '';
  };
});
