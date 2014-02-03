(function(){
   var ProjectPermissionsModalController = function($scope, $modalInstance, projectsService, AccountsService){

     

      $scope.cancel = function(){
        $modalInstance.dismiss('cancel');
      };

      $scope.refresh = function(){
        $scope.collaborators = [];
        projectsService.getProjectByProjectId(projectId, function(projDataErr, projectData){
          if(!projDataErr){
          var i, j, l = projectData.permissions.length;
          for (i=0; i < l; i++){
            j = i;
            //get accounts using acc ids
            AccountsService.getAccountById(projectData.permissions[j].account, function(accDataErr, accountData){
              if(!accDataErr){
                $scope.collaborators.push(accountData.identities);
              }else{
                $scope.errors.push(accDataErr);
              }
            });
          }
         }else
           {
             $scope.errors.push(projDataErr);
           }
        });
    };

};

   ProjectPermissionsModalController.$inject = ["$scope", "$modalInstance", "projectsService", "AccountsService"];
   angSpa.controller("projectPermissionsModalController", ProjectPermissionsModalController);

})();
