
'use strict';

var SubscriptionsController = function($scope,getAccountById, getSubscriptionsByAccountId, getSubscriptionPlanByPlanId, $cookieStore,$routeParams){
  $scope.subscriptionsModel = {
    userId : "",
    userName : "",
    provider : "",
    subscriptions:[],
    errors: []
  };

  var subscriptionData = {
            'id': "",
            'name': "",
            'plan': "",
            'projects': [],
            'containers': [],
            'owners': [],
            'created': "",
            'updated': "",
            'storageQuota': null,
            'nodesQUota': null
          };
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
            subscriptionData.id : data[i].id,
            subscriptionData.
            'name': data[i].name,
            subscriptionData.
            'plan': data[i].plan,
            subscriptionData.
            'projects': data[i].projects,
            subscriptionData.
            'containers': data[i].containers,
            subscriptionData.
            'owners': data[i].owners,
            subscriptionData.
            'created': data[i].created,
            subscriptionData.
            'updated': data[i].updated
            subscriptionData.
          };
       //writing separately for getting plan may not work in Async mode, since subPlan Id will be only available after getSubs api call.
       
    getSubscriptionPlanByPlanId.getSubscriptionPlan(planId, token, function(err, data){
    if(!err){
        subscriptionData
    }
    
    
    });



        $scope.subscriptionsModel.subscriptions.push(subscriptionData);
      }
    }else{
        $scope.err = err ;     
    }
    
    });
    
        //TODO: take subId and call plan/:id api to get subscription's plan data
        //TODO: update subscriptionData object
        //TODO: take subId and call builds api to get storage used data on that subscription
        //TODO: update the subscriptionData object

  };

$scope.init();
};

SubscriptionsController.$inject = ["$scope","getAccountById", "getSubscriptionsByAccountId", "getSubscriptionPlanByPlanId", "$cookieStore","$routeParams"];
angSpa.controller("subscriptionsController", SubscriptionsController);









