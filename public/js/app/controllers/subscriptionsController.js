
'use strict';

var SubscriptionsController = function($scope, $location, getAccountById, getSubscriptions, getPlans, $cookieStore,$routeParams){
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
        $scope.subscriptionsModel.errors.push('error in getting account details using account id');
      }
    });

    getSubscriptions.getSubscriptionsByAccountId($routeParams.accountId, function(err, subsData){
    if(!err){
      for(var i=0; i < subsData.length; i++) {
       
         getPlans.getPlanByPlanId(subsData[i].plan, function(err, planData){
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
            $scope.subscriptionsModel.errors.push('error in getting subscription plan using plan id') ;
         }
         
         });

    }
    }
    else{
        $scope.subscriptionsModel.errors.push('error in getting subscriptions using account id') ;     
    }
    
   });
    
  };

  $scope.getToNodesOnSubId = function(subId){
    $location.path("/subscriptions/"+subId+"/nodes");
  }
$scope.init();
};

SubscriptionsController.$inject = ["$scope", "$location", "getAccountById", "getSubscriptions", "getPlans", "$cookieStore","$routeParams"];
angSpa.controller("subscriptionsController", SubscriptionsController);









