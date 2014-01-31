/*jshint -W040 */
/*jshint -W055 */
/*jshint -W083 */
var AccountController = function($scope,$location,AccountsService,subscriptionsService,ProjectsService,$routeParams) {
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
  };
  $scope.goBack = function(){
    window.history.back();
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
   subscriptionsService.getSubscriptionsByAccountId($routeParams.accountId, function(err, subsData){
      if(err)
      {
        $scope.accountModel.err = 'There was an error while deleting this account';
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
            $scope.accountModel.err = 'There was an error while deleting this account';
          }
        });
      }
   });
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

  $scope.deleteBuilds = function(subsId,done){
   ProjectsService.getProjectsBySubscriptionId(subsId, function(err, projectsData){
            if(err){
              done(err);
            }
            else
            {
              for(var k=0; k < projectsData.length; k++) {
              var l = k;
               ProjectsService.deleteBuildsByProjectId(projectsData[l].id, function(status, data){
                if(status !== 200)
                  {
                   done(err);
                  }
                else
                {
                  done(null);
                }
                });
              }
            }
          });
 };
  $scope.deleteProjects = function(subsId,done){
    subscriptionsService.deleteProjectsBySubId(subsId, function(status, data){
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
 
AccountController.$inject = ["$scope","$location","AccountsService","subscriptionsService","ProjectsService","$routeParams"];
angSpa.controller("accountController",AccountController);
