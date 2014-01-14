
var AccountController = function($scope,$location,AccountsService,$routeParams) {
  $scope.accountModel={
                 id: "",
                 avatarId: "",
                 avatarUrl: "",
                 systemRole: [""], 
                 identities: [{
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
     else
     {
       $scope.accountModel = data;
       if(!Object.keys(data).length)
       {
        $scope.accountModel.err = 'This Account Id does not exist'
       }
     }
     
     });
  
   
};
AccountController.$inject = ["$scope","$location","AccountsService","$routeParams"];
angSpa.controller("accountController",AccountController);
