/*jshint -W040 */
/*jshint -W055 */
/*jshint -W083 */
'use strict';

var SubscriptionsController = function($scope, $modal, $log, $location, subscriptionsService, plansService,ProjectsService, $routeParams, AccountsService, $window){
  $scope.subscriptionsModel = {
    accountInfo: {},
    subscriptions:[],
    errors: [],
    zeroSubscriptionsMessage: ""
  };

  $scope.confirmDeleteSubscription = false;

  function subscriptionDataObject(id, name, percent_storageBytesUsed, percent_privateProjectsUsed,percent_nodesUsed, cardId){
    this.id = id;
    this.name = name;
    this.percent_storageBytesUsed = percent_storageBytesUsed;
    this.percent_privateProjectsUsed = percent_privateProjectsUsed;
    this.percent_nodesUsed = percent_nodesUsed;
    this.cardId = cardId;
  }
  $scope.sort = {column:'name', descending: false};

  $scope.init = function(){
    $scope.subscriptionsModel.subscriptions = [];
    $scope.subscriptionsModel.errors = [];

      $scope.changeSorting = function(column){
        if($scope.sort.column === column){
          $scope.sort.descending = !$scope.sort.descending;
        }else{
          $scope.sort.column = column;
          $scope.sort.descending = false;
        }
     };

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
              var percent_storageBytesUsed = ((subsData[j].storageBytesUsed/(planData.storageGigaBytesQuota * 1073741824))*100).toFixed(2);
              var percent_privateProjectsUsed = (subsData[j].privateProjectsCount/planData.privateProjectsQuota)*100;
              var nodesUsed = subsData[j].nodes.length;
              var percent_nodesUsed = (nodesUsed/planData.nodesQuota)*100;
              var subscriptionData = new subscriptionDataObject(subsData[j].id,
                                                                subsData[j].name,
                                                                percent_storageBytesUsed,
                                                                percent_privateProjectsUsed,
                                                                percent_nodesUsed,
                                                                subsData[j].card
                                                               );

                                                               $scope.subscriptionsModel.subscriptions.push(subscriptionData);
            }else{
              $scope.subscriptionsModel.errors.push(errP);
            }

          });
        }

      }
      else{
        $scope.subscriptionsModel.errors.push(errS);
      }

    });

  };

  $scope.getToNodesOnSubId = function(subId){
    $location.path("/subscriptions/"+subId+"/nodes");

  };
  $scope.getProjects = function(subId){
    $location.path("/subscriptions/"+subId+"/projects");
  };
  $scope.getCardInfo = function(cardId){
    $location.path("/cards/"+cardId);
  };
  
  $scope.delSubBySubId = function(subId){
    $scope.modalInstance = $modal.open({
      //templateUrl should be the path assuming public as the root.
      templateUrl: '/templates/deleteSubscriptionModal.html',
      controller: 'simpleModalController',
    });
    
    $scope.modalInstance.result.then(
    function(okString){
    $scope.confirmDeleteSubscription = true;
    $scope.deleteBuilds(subId, function(err){
      if(!err)
      {
        $scope.deleteProjects(subId, function(err){
           if(!err)
            {
              $scope.deleteSubscription(subId);
            }
            else
            {
              $scope.subscriptionsModel.errors.push("Error in deleting subscription");
            }
        });
      }
      else
      {
        $scope.subscriptionsModel.errors.push("Error in deleting subscription");
      }
    });
   }, function(cancelString) {
        $scope.confirmDeleteSubscription = false;
        $log.info('Modal dismissed at: ' + new Date());
   });
  };

  $scope.deleteBuilds = function(subId, done){
    ProjectsService.getProjectsBySubscriptionId(subId, function(err, projectsData){
            if(err){
              done(err);
            }
            else
            {
              if(projectsData.length === 0){
                done(null);
              }
              else
              {
                for(var k=0; k < projectsData.length; k++) {
                var l = k;
                 ProjectsService.deleteBuildsByProjectId(projectsData[l].id, function(status, data){
                  if(status !== 200)
                    {
                      done(data);
                    }
                  });
                }
                done(null);
              }
            }
          });
  };
  $scope.deleteProjects = function(subId,done){
    subscriptionsService.deleteProjectsBySubId(subId, function(status, data){
      if(status === 200){
        done(null);
      }
      else{
        done(data);
      }
    });
  };
  $scope.deleteSubscription = function(subId){
  subscriptionsService.deleteSubscriptionBySubId(subId, function(status, data){
          if(status === 200){
            $scope.init();
          }else{
            $scope.subscriptionsModel.errors.push("Error in deleting subscription:" + data);
          }
        });
  };

  $scope.goBack = function(){
    window.history.back();
  };

  $scope.goForward = function(){
    window.history.forward();
  };


  $scope.init();
};

SubscriptionsController.$inject = ["$scope", "$modal", "$log", "$location", "subscriptionsService", "plansService", "ProjectsService", "$routeParams", "AccountsService", "$window"];
angSpa.controller("subscriptionsController", SubscriptionsController);