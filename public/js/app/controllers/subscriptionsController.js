/*jshint -W040 */
/*jshint -W055 */
/*jshint -W083 */
'use strict';

var SubscriptionsController = function($scope, $location, subscriptionsService, plansService, $routeParams, AccountsService, $window){
  $scope.subscriptionsModel = {
    accountInfo: {},
    subscriptions:[],
    errors: [],
    zeroSubscriptionsMessage: ""
  };

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
              var percent_storageBytesUsed = (subsData[j].storageBytesUsed/(planData.storageGigaBytesQuota * 1073741824))*100;
              var percent_privateProjectsUsed = (subsData[j].privateProjectsCount/planData.privateProjectsQuota)*100;
              var arr = ['1'];
              var nodesUsed = arr.length; // TODO change it to subsData[j].nodes.length
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
    var confirmDelete = $window.confirm("click OK to delete subscription");
    if(confirmDelete)
      {
        subscriptionsService.deleteSubscriptionBySubId(subId, function(status, data){
          if(status === 200){
            $scope.init();
          }else{
            $scope.subscriptionsModel.errors.push("Error in deleting subscription:" + data);
          }
        });
      }
  };

  $scope.goBack = function(){
    window.history.back();
  };

  $scope.goForward = function(){
    window.history.forward();
  };


  $scope.init();
};

SubscriptionsController.$inject = ["$scope", "$location", "subscriptionsService", "plansService", "$routeParams", "AccountsService", "$window"];
angSpa.controller("subscriptionsController", SubscriptionsController);
