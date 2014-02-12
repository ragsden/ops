'use strict';

var QueuesController = function($scope,$routeParams,QueuesService) {
  $scope.queuesModel={
      queues: [{
          name : "",
          status: "",
          consumers: [{
            channel_details : {
              name : ""
            }
          }],
          pending_acks: "",
    }],
    err:""
  };
  $scope.init = function()
  {
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
    $scope.messages = [];
    QueuesService.clearQueueByQueueName(queueName, function(status, data){
        if(status === 200){
            $scope.messages.push('Queue: ' + queueName + 'cleared');
            $scope.init();
        }else{
            $scope.messages.push('Error in clearing Queue: ' + queueName);
        }
    });
  };



  $scope.init();
};
QueuesController.$inject = ["$scope","$routeParams","QueuesService"];
angSpa.controller("queuesController",QueuesController);
