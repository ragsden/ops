
var AccountController = function($scope,$location,AccountsService,$routeParams) {
  $scope.accountModel={
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
                err : "",
              };
  
     AccountsService.getAccountById($routeParams.accountId,function(err,data){
      if(err)
       {
         $scope.accountModel.err = 'Error getting the Account Profile.';
      }     
     else
     {
       $scope.accountModel = data;
      }
     
     });
   
};
AccountController.$inject = ["$scope","$location","AccountsService","$routeParams"];
angSpa.controller("accountController",AccountController);
