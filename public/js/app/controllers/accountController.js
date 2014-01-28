
var AccountController = function($scope,$location,AccountsService,$routeParams) {
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
AccountController.$inject = ["$scope","$location","AccountsService","$routeParams"];
angSpa.controller("accountController",AccountController);
