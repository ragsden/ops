/*jshint -W040 */
/*jshint -W055 */
/*jshint -W083 */
(function(){
   var ProjectPermissionsModalController = function($scope, $modalInstance, ProjectsService, AccountsService, data){

      $scope.cancel = function(){
        $modalInstance.dismiss('cancel');
      };

      $scope.projectUpdate = {
        "name" : null,
        "nodeType" : null,
        "subscription" : null,
        "permissions" : []
      };

      $scope.projectUpdate.subscription = data.subscriptionId;

      $scope.projectId = data.projectId;
      $scope.permissionsModalErrors = [];

      function CollaboratorObj(account, roles, identities){
        this.account = account;
        this.roles = roles;
        this.identities = identities;
      }

      $scope.refresh = function(){
        
        $scope.selection = "inactive";
        $scope.collaborators = [];
        //console.log('projId in modal: '+ $scope.projectId);
        
        ProjectsService.getProjectByProjectId($scope.projectId, function(projDataErr, projectData){
         if(!projDataErr){
          $scope.projectUpdate.name = projectData.name;
          $scope.projectUpdate.nodeType = projectData.nodeType;
          $scope.repositoryProvider = projectData.repositoryProvider;
          var i, j, l = projectData.permissions.length;
          for (i=0; i < l; i++){
            j = i;
            //get accounts using acc ids
            AccountsService.getAccountById(projectData.permissions[j].account, function(accDataErr, accountData){
              if(!accDataErr){
                var collaborator = new CollaboratorObj(projectData.permissions[j].account, projectData.permissions[j].roles, accountData.identities);
                console.log(collaborator);
                $scope.collaborators.push(collaborator);
                console.log(l);
                console.log($scope.collaborators);
              }else{
                $scope.permissionsModalErrors.push(accDataErr);
               //console.log("accDataErr: "+ accDataErr);
              }
            });
          }
          console.log($scope.collaborators);
         }else
           {
             $scope.permissionsModalErrors.push(projDataErr);
             //console.log("projDataErr: " + projDataErr);
           }
        });
    };

    $scope.updateProject = function(){
      console.log("collaborators: "+ $scope.collaborators);
      var k, l=$scope.collaborators.length;
      for(k=0; k< l; k++){
        delete $scope.collaborators[k].identities;
      }

      $scope.projectUpdate.permissions = $scope.collaborators;

      ProjectsService.updateProjectByProjectId($scope.projectId, $scope.projectUpdate, function(updateErr, data){
        if(!updateErr){
            $modalInstance.close("project updated");
        }      
      });

      //build the overall update object to pass to API call.
      //make http call now...

    };

    
    $scope.addCollaborator = function(){
      $scope.selection = "active";

      //githubId/ bitbucketId 
      //get the account- make API call 
      //if no account exists - redirect to INVITE api -create account
      //push the account and the role into the permissions.

      //make a http request by adding this info to permissions

      $scope.refresh();
    };

    $scope.refresh();

};

   ProjectPermissionsModalController.$inject = ["$scope", "$modalInstance", "ProjectsService", "AccountsService", "data"];
   angSpa.controller("projectPermissionsModalController", ProjectPermissionsModalController);

})();
