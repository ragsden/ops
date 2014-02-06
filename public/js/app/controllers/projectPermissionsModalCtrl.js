/*jshint -W040 */
/*jshint -W055 */
/*jshint -W083 */
(function(){
   var ProjectPermissionsModalController = function($scope, $modalInstance, ProjectsService, AccountsService, dataToPermissionsModal, $filter){

      $scope.cancel = function(){
        $modalInstance.dismiss('cancel');
      };

      $scope.projectUpdate = {
        "name" : null,
        "nodeType" : null,
        "subscription" : null,
        "permissions" : []
      };

 //     console.log(dataToPermissionsModal.subscriptionId);

      $scope.projectId = dataToPermissionsModal.projectId;
      $scope.permissionsModalErrors = [];
      $scope.newCollaboratorUsername = "";

      function CollaboratorObj(account, roles, identities){
        this.account = account;
        this.roles = roles;
        this.identities = identities;
      }

      $scope.refresh = function(){
      
        $scope.projectUpdate.subscription = dataToPermissionsModal.subscriptionId;
        
        $scope.selection = "default";
        $scope.collaborators = [];
        //console.log('projId in modal: '+ $scope.projectId);
        
        ProjectsService.getProjectByProjectId($scope.projectId, function(projDataErr, projectData){
         if(!projDataErr){
          
          $scope.projectUpdate.name = projectData.name;
          $scope.projectUpdate.nodeType = projectData.nodeType;
          $scope.repositoryProvider = projectData.repositoryProvider;
   
          var i,  l = projectData.permissions.length;

          _.each(projectData.permissions, function(permission){
            AccountsService.getAccountById(permission.account, function(accDataErr, accountData){
                if(!accDataErr){
                  var collaborator = new CollaboratorObj(permission.account, permission.roles, accountData.identities);
                  console.log(collaborator);
                  $scope.collaborators.push(collaborator);
                }else{
                  console.log("err in getting account: " + accDataErr);
                }
            });
           } 
          );



/*
          for (i=0; i < l; i++){
            var j = i;
            //get accounts using acc ids
            AccountsService.getAccountById(projectData.permissions[j].account, function(accDataErr, accountData){
              if(!accDataErr){
                var collaborator = new CollaboratorObj(projectData.permissions[j].account, projectData.permissions[j].roles, accountData.identities);
                console.log(collaborator);
                $scope.collaborators.push(collaborator);
              //  console.log(l);
              //  console.log($scope.collaborators);
              }else{
                $scope.permissionsModalErrors.push(accDataErr);
               //console.log("accDataErr: "+ accDataErr);
              }

            });
          }  */
          // console.log($scope.collaborators);
         }else
           {
             $scope.permissionsModalErrors.push(projDataErr);
             //console.log("projDataErr: " + projDataErr);
           }
        });
    };

    $scope.updateProject = function(){
      var k, l=$scope.collaborators.length;
      for(k=0; k< l; k++){
        var p = k;
        delete $scope.collaborators[p].identities;
      }
      
      $scope.projectUpdate.permissions = $scope.collaborators;

      ProjectsService.updateProjectByProjectId($scope.projectId, $scope.projectUpdate, function(updateErr, data){
        if(!updateErr){
//            $modalInstance.close("project updated");
         $scope.refresh();
        }      
      });
    };

    
    $scope.addNewCollaborator = function(){
      $scope.selection = "addingCollaborator";
    };

    $scope.searchForShippableAccount = function(newCollaboratorUsername){
        $scope.newCollaboratorUsername = newCollaboratorUsername;
//        console.log($scope.newCollaboratorUsername);
        AccountsService.searchAccountsByUsername($scope.newCollaboratorUsername, function(err, searchAccsResults){
          if(!err){
//            console.log(searchAccsResults);
            //write service that filters the accounts and give a single account
            var account = $filter("filterAccountsByUsername")($scope.repositoryProvider, $scope.newCollaboratorUsername, searchAccsResults);
            console.log(account);
            //$scope.newCollaboratorAccount = account;
            //  setTimeout(function(){alert("Hello")},3000);

            account.identities = $filter('filter')(account.identities, function(){
                return function(){
                  console.log(account.identities);
                  var filteredAccountIdentity;
                    for(var i=0; i < account.identities; i++){
                        if(account.identities[i].provider === $scope.repositoryProvider){
                           filteredAccountIdentity = account.identities.splice(i,1);
                        }
                    }
                    return filteredAccountIdentity;
                };
                console.log("filteredAccountIdentity: " + filteredAccountIdentity);
              });
            
              console.log("accountIdentities:");
              console.log(account.identities);
              $scope.newCollaborator = new CollaboratorObj(account.id, [], account.identities);
              $scope.selection = "addingCollaboratorRoles";

              $scope.updateNewCollaborator = function(){
                $scope.collaborators.push($scope.newCollaborator);
                console.log($scope.collaborators);
                $scope.updateProject();
              };
              
              



              //check the repositry provider and make sure that you delete the other identity provider data
              //let user decide the roles

              //append the data
             // $scope.refresh(); in the callback
            }else{
              console.log("search accounts error");
            }
        });

      //githubId/ bitbucketId 
      //get the account- make API call 
      //if no account exists - redirect to INVITE api -create account
      //push the account and the role into the permissions.

      //make a http request by adding this info to permissions

    };

    $scope.refresh();

};

   ProjectPermissionsModalController.$inject = ["$scope", "$modalInstance", "ProjectsService", "AccountsService", "dataToPermissionsModal", "$filter"];
   angSpa.controller("projectPermissionsModalController", ProjectPermissionsModalController);

})();
