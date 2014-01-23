
'use strict';

var SubscriptionsController = function($scope, $location, subscriptionsService, plansService, $routeParams, AccountsService){
  $scope.subscriptionsModel = {
    accountInfo: {},
    subscriptions:[],
    errors: [],
    zeroSubscriptionsMessage: ""
  };

  function subscriptionDataObject(id, name, plan, projects, containers, owners, created, updated, planName, nodesQuota, privateProjectsQuota, storageQuota){ 
    this.id = id;
    this.name = name;
    this.plan = plan;
    this.projects = projects;
    this.containers = containers;
    this.owners = owners;
    this.created = created;
    this.updated = updated;
    this.planName = planName;
    this.nodesQuota = nodesQuota;  
    this.privateProjectsQuota = privateProjectsQuota;
    this.storageQuota = storageQuota;
  }
  
  $scope.init = function(){
    $scope.subscriptionsModel.subscriptions = [];
    $scope.subscriptionsModel.errors = [];

    AccountsService.getAccountById($routeParams.accountId, function(status, data){
      if(status=== 401)
       {
         $scope.subscriptionsModel.errors = 'You are not allowed to use this feature.';
      }
      else if(status === 400)
      {
        $scope.subscriptionsModel.errors = data;
      }
     else
     {
       $scope.subscriptionsModel.accountInfo = data;
      }
    }); 

    subscriptionsService.getSubscriptionsByAccountId($routeParams.accountId, function(errS, subsData){
    if(subsData.length === 0){
        $scope.subscriptionsModel.zeroSubscriptionsMessage = 'There are no subscriptions on this account';
      }
    if(!errS){
      for(var i=0; i < subsData.length; i++) {
         var j = i;
         plansService.getPlanByPlanId(subsData[j].plan, function(errP, planData){
         if(!errP){
             var subscriptionData = new subscriptionDataObject(subsData[j].id, 
                                                               subsData[j].name, 
                                                               subsData[j].plan, 
                                                               subsData[j].projects, 
                                                               subsData[j].containers, 
                                                               subsData[j].owners, 
                                                               subsData[j].created, 
                                                               subsData[j].updated,
                                                               planData.name,
                                                               planData.nodesQuota,
                                                               planData.privateProjectsQuota,
                                                               planData.storageGigaBytesQuota
                                                              );           

            $scope.subscriptionsModel.subscriptions.push(subscriptionData);
         }else{
            $scope.subscriptionsModel.errors.push(errP);
         }
         
         });
      }
        
    }
    else{
        $scope.subscriptionsModel.errors.push(errS) ;     
    }
    
   });
    
  };

  $scope.getToNodesOnSubId = function(subId){
    $location.path("/subscriptions/"+subId+"/nodes");

  }
   $scope.getProjects = function(subId){
    $location.path("/subscriptions/"+subId+"/projects");
  }

  $scope.delSubBySubId = function(subId){
    var confirmDelete = confirm("click OK to delete subscription");
    if (confirmDelete === true)
     {
      subscriptionsService.deleteSubscriptionBySubId(subId, function(status, data){
      if(status === 200){
        $scope.init();
      }else{
        $scope.subscriptionsModel.errors.push("Error in deleting subscription:" + data);
      }
      });
     };   
  };
$scope.init();
};

SubscriptionsController.$inject = ["$scope", "$location", "subscriptionsService", "plansService", "$routeParams", "AccountsService"];
angSpa.controller("subscriptionsController", SubscriptionsController);









