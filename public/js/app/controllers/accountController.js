
var AccountController = function($scope,$location,getAccountById,$cookieStore,$routeParams) {
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
  $scope.getAccount = function()
  {
    getAccountById.getAccount($routeParams.accountId,function(err,data){
     if(!err)
     {
       $scope.accountModel = data;
     }
     else
      {
        $scope.accountModel.err = err;
      }
     });
   }
  $scope.getAccount();  // call getAccount() as the page loads 
};
AccountController.$inject = ["$scope","$location","getAccountById","$cookieStore","$routeParams"];
angSpa.controller("accountController",AccountController);
