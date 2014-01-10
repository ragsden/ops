
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
  var token = $cookieStore.get(config.shippableTokenIdentifier);
  $scope.getAccount = function()
  {
    getAccountById.getAccount($routeParams.accountId,token,function(err,data){
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
