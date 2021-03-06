/*jshint -W040 */
/*jshint -W055 */
/*jshint -W083 */
var AccountController = function($q,$scope,$modal,$log,$location,AccountsService,subscriptionsService,ProjectsService,$routeParams) {
  $scope.accountModel={
    account : {
    id: "",
    lastUsedIdentityId: "",
    systemRoles: [""],
    identities: [{
      id: "",
      providerId: "",
      firstName: "" ,
      lastName: "",
      userName: "",
      displayName: "",
      avatarUrl: "",
      avatarId: "",
      provider: ""
    }],
  },
    err : "",
    status : "",
    disable_deleteAccountButton : "false",
    confirmDeleteAccount : "false",
  };
   AccountsService.getAccountById($routeParams.accountId,function(err,data){
    if(err)
      {
        $scope.accountModel.err = 'Error getting the Account Profile.';
        $scope.disable_deleteAccountButton = "true";
      }
      else
        {
          $scope.accountModel.account = data;
        }

  });
  $scope.deleteAccount = function(){
     $scope.modalInstance = $modal.open({
      templateUrl: '/templates/deleteAccountModal.html',
      controller: 'simpleModalController',
    });

   $scope.modalInstance.result.then(
     function(okString){
    $scope.accountModel.confirmDeleteAccount = true;
    subscriptionsService.getSubscriptionsByAccountId($routeParams.accountId, function(err, subsData){
      if(err)
      {
        $scope.accountModel.err = 'There was an error while deleting this account';
      }
      else
      {
        if(subsData.length === 0){
              $scope.deleteAcc();
            }
        else
        {
          $scope.removeProjectsAndBuilds(subsData,function(err){
            if(!err)
            {
              $scope.deleteSubscriptions(function(err){
                             if(!err)
                               {
                                $scope.deleteAcc();
                              }
                              else
                              {
                               $scope.accountModel.err = 'There was an error while deleting this account' + err;
                              }
              });
            }
            else
            {
              $scope.accountModel.err = 'There was an error while deleting this account' + err;
            }
          });
        }
      }
   });
  }, function(cancelString) {
        $scope.accountModel.confirmDeleteAccount = false;
        $log.info('Modal dismissed at: ' + new Date());
   }
  );
};
  $scope.removeProjectsAndBuilds = function(subsData,callback) {
        for(var i=0; i < subsData.length; i++) {
          var j = i;
          $scope.deleteBuilds(subsData[j].id, function(err){
            if(!err)
              {
                $scope.deleteProjects(subsData[j].id, function(err){
                   if(!err)
                    {
                      callback(null);
                    }
                    else
                    {
                      callback(err);
                    }
                   });
              }
              else
              {
                callback(err);
              }
          });
        }
      };

  $scope.deleteBuilds = function(subId,done){
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
                var deferred = $q.defer();
                var promises = [];

                    projectsData.forEach(function(obj) {
                    var prom = ProjectsService.deleteBuildsByProjectId(obj.id);
                    promises.push(prom);
                    });

                    $q.all(promises).then(function success(data){
                      done(null);
                 },function failure(err)
                 {
                  done(err);
                 });
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
$scope.deleteSubscriptions = function(done){
        AccountsService.deleteSubsByAccId($routeParams.accountId, function(status, data){
          if(status === 200){
            done(null);
            }
          else{
            done(data);
           }
          });
      };

  $scope.deleteAcc = function()
    {
      AccountsService.deleteAccountById($routeParams.accountId, function(status, data){
              if(status === 200){
               $scope.accountModel.account = {};
               $scope.accountModel.status = 'The account ' + $routeParams.accountId + ' has been deleted.';
               $scope.disable_deleteAccountButton = "true";
              }
              else
              {
                $scope.accountModel.err = 'There was an error while deleting this account :' + data;
              }
              });
    };
};
 
AccountController.$inject = ["$q","$scope","$modal","$log","$location","AccountsService","subscriptionsService","ProjectsService","$routeParams"];
angSpa.controller("accountController",AccountController);
