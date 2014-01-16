
var AccountController = function($scope,$location,AccountsService,$routeParams) {
  $scope.accountModel={
                 id: "",
                 lastUsedIdentityId: "",
                 systemRole: [""], 
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
      if(err === 401)
       {
         $scope.accountModel.err = 'You are not allowed to use this feature.';
      }
      else if(err === 400)
      {
        $scope.accountModel.err = data;
      }
     else
     {
       $scope.accountModel = data;
      }
     
     });
   
};
AccountController.$inject = ["$scope","$location","AccountsService","$routeParams"];
angSpa.controller("accountController",AccountController);
