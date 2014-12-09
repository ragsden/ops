
'use strict';

var SubscriptionsController = function($scope,getAccountById, getSubscriptionsByAccountId, $cookieStore,$routeParams){
  $scope.subscriptionsModel = {
    userId : "",
    userName : "",
    provider : "",
    subscriptions:[],
    errors: []
  };

  var subscriptionData;
  var token = $cookieStore.get(config.shippableTokenIdentifier);
  $scope.init = function(){
    getAccountById.getAccount($routeParams.accountId,token,function(err,data){
     if(!err)
     {
       $scope.subscriptionsModel.userId = data.id;
       $scope.subscriptionsModel.userName = data.identities[0].userName;
       $scope.subscriptionsModel.provider = data.identities[0].provider;
     }
     else
      {
        $scope.err = err;
      }
    });

    getSubscriptionsByAccountId.getSubscriptions($routeParams.accountId, token, function(err, data){
    if(!err){
      for(var i=0; i < data.length; i++) {
          subscriptionData = {
            'id' : data[i].id,
            'name': data[i].name,
            'plan': data[i].plan,
            'projects': data[i].projects,
            'containers': data[i].containers,
            'owners': data[i].owners,
            'created': data[i].created,
            'updated': data[i].updated
          };
       };
       //writing separately for getting plan may not work in Async mode, since subPlan Id will be only available after getSubs api call.
       
//    getSubscriptionPlanByPlanId.getSubscriptionPlan(planId, token, function(err, data){
//    if(!err){
       // subscriptionData
//    }
//    });

        $scope.subscriptionsModel.subscriptions.push(subscriptionData);
    
    }else{
        $scope.err = err ;     
    }
    
    });
    
  };

$scope.init();
};

SubscriptionsController.$inject = ["$scope","getAccountById", "getSubscriptionsByAccountId", "$cookieStore","$routeParams"];
angSpa.controller("subscriptionsController", SubscriptionsController);









