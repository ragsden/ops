'use strict';

var QueuesController = function($scope,$routeParams,QueuesService, $interval) {
  $scope.queuesModel={
      queues: [{
          name : "",
          status: 0,
          consumers: [{
            channel_details : {
              name : ""
            }
          }],
          pending_acks: 0,
    }],
    err:""
  };

  $scope.init = function(){
    $scope.queuesModel.err = "";
    QueuesService.getQueuesBySubId($routeParams.subscriptionId,function(err,data){
     if(err)
      {
        $scope.queuesModel.err = 'Error getting the Queues Information.';
      }
      else
        {
          $scope.queuesModel.queues = data;
        }

    });
  };
  
  $scope.clearQueue = function(queueName){
    $scope.queuesModel.err = "";
    QueuesService.clearQueueByQueueName(queueName, function(status, data){
      if(status === 200){
        $scope.queuesModel.err = 'Queue: ' + queueName + 'cleared';
        $interval(function(){ $scope.init(); }, 5*1000, 1 );
      }else{
        $scope.queuesModel.err = 'Error in clearing Queue: ' + queueName ;
      }
    });
  };

  $scope.init();

};
QueuesController.$inject = ["$scope","$routeParams","QueuesService", "$interval"];
angSpa.controller("queuesController",QueuesController);
