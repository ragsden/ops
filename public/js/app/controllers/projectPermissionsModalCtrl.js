(function(){
   var ProjectPermissionsModalController = function($scope, $modalInstance, ProjectsService, AccountsService, dataToPermissionsModal, $filter){

      $scope.close = function(){
        $modalInstance.dismiss('close');
      };
      
      $scope.projectId = dataToPermissionsModal.projectId;

      $scope.projectUpdate = {
        "name" : null,
        "nodeType" : null,
        "subscription" : null,
        "permissions" : []
      };
      
      $scope.projectUpdate.subscription = dataToPermissionsModal.subscriptionId;

      $scope.newCollaboratorUsername = "";

      function CollaboratorObj(account, roles, identities){
        this.account = account;
        this.roles = roles;
        this.identities = identities;
      }
      
      $scope.permissionsModalErrors = [];

      $scope.refresh = function(){
        $scope.selection = "default";
        $scope.collaborators = [];
        
        ProjectsService.getProjectByProjectId($scope.projectId, function(projDataErr, projectData){
         if(!projDataErr){
          
          $scope.projectUpdate.name = projectData.name;
          $scope.projectUpdate.nodeType = projectData.nodeType;
          $scope.repositoryProvider = projectData.repositoryProvider;
   
          _.each(projectData.permissions, function(permission){
            AccountsService.getAccountById(permission.account, function(accDataErr, accountData){
                if(!accDataErr){
                  var collaborator = new CollaboratorObj(permission.account, permission.roles, accountData.identities);
                  $scope.collaborators.push(collaborator);
                }else{
                  $scope.permissionsModalErrors.push("Error in getting accounts");
                }
            });
           }
          );

         }else
           {
             $scope.permissionsModalErrors.push("Error in getting the project data");
           }
        });
    };

    $scope.updateProject = function(){
      $scope.permissionsModalErrors = [];
      var owners = 0;
      _.each($scope.collaborators, function(collaborator){
        if(collaborator.roles[0] === "projectOwner"){
          owners = owners + 1;
        }
      });

      if(owners < 1){
        $scope.permissionsModalErrors.push("Cannot change role of owner when there is a single owner.");
        $scope.refresh();
      }else{
      var k, l=$scope.collaborators.length;
      for(k=0; k< l; k++){
        var p = k;
        delete $scope.collaborators[p].identities;
      }
      
      $scope.projectUpdate.permissions = $scope.collaborators;

      ProjectsService.updateProjectByProjectId($scope.projectId, $scope.projectUpdate, function(status, data){
        if(status === 200){
         $scope.refresh();
        }else{
         $scope.permissionsModalErrors.push("Error in updating the project permissions");
        }
      });
    }
    };

    $scope.removeCollaborator = function(index){
      $scope.permissionsModalErrors = [];

      var collaboratorToDelete = $scope.collaborators[index];
      var owners = 0;
      _.each($scope.collaborators, function(collaborator){
        if(collaborator.roles[0] === "projectOwner"){
            owners = owners + 1 ;
        }
      });

      if(owners === 1 && collaboratorToDelete.roles[0] === "projectOwner"){
        $scope.permissionsModalErrors.push('The last owner cannot be removed.');
      }else{
        $scope.collaborators = _.without($scope.collaborators, _.findWhere($scope.collaborators, $scope.collaborators[index]));
        $scope.updateProject();
      }
    };

    
    $scope.addNewCollaborator = function(newCollaboratorUsername){
        $scope.permissionsModalErrors = [];
        $scope.newCollaboratorUsername = newCollaboratorUsername;
        AccountsService.searchAccountsByUsername($scope.newCollaboratorUsername, function(err, searchAccsResults){
          if(!err){
            var account = $filter("filterAccountsByUsername")($scope.repositoryProvider, $scope.newCollaboratorUsername, searchAccsResults);
            if(!account){
              $scope.permissionsModalErrors.push("Account not found for the entered username");
            }else{
            account.identities = $filter('filter')(account.identities, function(){
                return function(){
                  var filteredAccountIdentity;
                    for(var i=0; i < account.identities; i++){
                        if(account.identities[i].provider === $scope.repositoryProvider){
                           filteredAccountIdentity = account.identities.splice(i,1);
                        }
                    }
                    return filteredAccountIdentity;
                };
              });

              if(!_.find($scope.collaborators, function(collaborator){return account.id === collaborator.account; })){
            
                $scope.newCollaborator = new CollaboratorObj(account.id, ["projectMember"], account.identities);

                $scope.collaborators.push($scope.newCollaborator);
                $scope.updateProject();
              }else{
                $scope.permissionsModalErrors.push("Collaborator exists.");
              }
             }
            }else{
              $scope.permissionsModalErrors.push("No account on Shippable for the entered username");
            }
          
         });

    };

    $scope.refresh();

};

   ProjectPermissionsModalController.$inject = ["$scope", "$modalInstance", "ProjectsService", "AccountsService", "dataToPermissionsModal", "$filter"];
   angSpa.controller("projectPermissionsModalController", ProjectPermissionsModalController);

})();
