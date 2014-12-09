
'use strict';

var SubscriptionsController = function($scope,getAccountById, getSubscriptionsByAccountId, getSubscriptionPlanByPlanId, $cookieStore,$routeParams){
  $scope.subscriptionsModel = {
    userId : "",
    userName : "",
    provider : "",
    subscriptions:[],
    errors: []
  };
  
  function subscriptionDataObject(id, name, plan, projects, containers, owners, created, updated, storageQuota, nodesQuota){ 
    this.id = id;
    this.name = name;
    this.plan = plan;
    this.containers = containers;
    this.owners = owners;
    this.created = created;
    this.updated = updated;
    this.storageQuota = storageQuota;
    this.nodesQuota = nodesQuota;  
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
        $scope.subscriptionsModel.errors.push(err);
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
                                                               planData.storageGigaBytesQuota,
                                                               planData.nodesQuota                                
                                                              );           

            $scope.subscriptionsModel.subscriptions.push(subscriptionData);
         }else{
           $scope.subscriptionsModel.errors.push(err);
         }
         
         });


    
    }

    }else{
        $scope.subscriptionsModel.errors.push(err) ;     
    }
    });
    
  };

$scope.init();
};

SubscriptionsController.$inject = ["$scope","getAccountById", "getSubscriptionsByAccountId", "getSubscriptionPlanByPlanId", "$cookieStore","$routeParams"];
angSpa.controller("subscriptionsController", SubscriptionsController);









