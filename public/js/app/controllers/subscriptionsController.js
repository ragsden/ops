
'use strict';

var SubscriptionsController = function($scope,getAccountById, getSubscriptionsByAccountId, getSubscriptionPlanByPlanId, $cookieStore,$routeParams){
  $scope.subscriptionsModel = {
    userId : "",
    userName : "",
    provider : "",
    subscriptions:[],
    errors: []
  };
  
  function subscriptionDataObject(id, name, plan, projects, containers, owners, created, updated, planName, nodesQuota, privateProjectsQuota, storageQuota){ 
    this.id = id;
    this.name = name;
    this.plan = plan;
    this.containers = containers;
    this.owners = owners;
    this.created = created;
    this.updated = updated;
    this.planName = planName;
    this.nodesQuota = nodesQuota;  
    this.privateProjectsQuota = privateProjectsQuota;
    this.storageQuota = storageQuota;
  }

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
        $scope.errors = err;
      }
    });

    getSubscriptionsByAccountId.getSubscriptions($routeParams.accountId, token, function(err, subsData){
    if(!err){
      for(var i=0; i < subsData.length; i++) {
       
       //writing separately for getting plan may not work in Async mode, since subPlan Id will be only available after getSubs api call.
       
         getSubscriptionPlanByPlanId.getSubscriptionPlan(subsData[i].plan, token, function(err, planData){
         if(!err){
             var subscriptionData = new subscriptionDataObject(subsData[i].id, 
                                                               subsData[i].name, 
                                                               subsData[i].plan, 
                                                               subsData[i].projects, 
                                                               subsData[i].containers, 
                                                               subsData[i].owners, 
                                                               subsData[i].created, 
                                                               subsData[i].updated,
                                                               planData.name,
                                                               planData.nodesQuota,
                                                               planData.privateProjectsQuota,
                                                               planData.storageGigaBytesQuota
                                                              );           

            $scope.subscriptionsModel.subscriptions.push(subscriptionData);
         }else{
            $scope.errors = err ;
         }
         
         });

    }
    }
    else{
        $scope.errors = err ;     
    }
    
   });
    
  };

$scope.init();
};

SubscriptionsController.$inject = ["$scope","getAccountById", "getSubscriptionsByAccountId", "getSubscriptionPlanByPlanId", "$cookieStore","$routeParams"];
angSpa.controller("subscriptionsController", SubscriptionsController);









