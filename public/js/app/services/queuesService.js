angSpa.factory('QueuesService',function($http){
  var middlewareUrl = config.MW_URL;
  var QueuesService = function(){
    QueuesService.prototype.getQueuesBySubId = function(subId,done){
          var getQueuesByIdUrl = middlewareUrl + "/subscriptions/" + subId + "/queues";
          $http({method: 'GET', url: getQueuesByIdUrl}).
            success(function(data,status,header,config) {
            done(null,data);
          }).error(function(data,status,headers,config) {
            done(status,data);
          });
  };

    QueuesService.prototype.clearQueueByQueueName = function(queueName,done){
          var clearQueueUrl = middlewareUrl + "/queues/" + queueName ;
          $http({method: 'PUT', url: clearQueueUrl}).
            success(function(data, status, header, config) {
            done(status, data);
          }).error(function(data, status, headers, config) {
            done(status, data);
          });
  };


  };
  return new QueuesService();
});
