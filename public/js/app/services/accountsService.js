angSpa.factory('AccountsService',function($http){
  var middlewareUrl = config.MW_URL;
  var AccountsService = function(){
  };

  AccountsService.prototype.searchAccountsByUsername = function(githubId,done){
          var searchAccountsUrl = middlewareUrl + "/accounts/search/" + githubId;
          $http({method: 'GET', url: searchAccountsUrl}).
            success(function(data,status,header,config) {
            done(null,data);
          }).error(function(data,status,headers,config) {
            done(status,data);
          });
  };
  AccountsService.prototype.getAccountById = function(accountId,done){
             var getAccountByIdUrl = middlewareUrl + "/accounts/" + accountId;
          $http({method: 'GET',url: getAccountByIdUrl }).
            success(function(data, status, headers, config) {
            done(null,data);
          }).
            error(function(data, status, headers, config) {
            done(status,data);
          });
  };
   AccountsService.prototype.deleteSubsByAccId = function(accountId,done){
          var deleteSubsByAccIdUrl = middlewareUrl + "/accounts/" + accountId + "/subscriptions";
          $http({method: 'DELETE',url: deleteSubsByAccIdUrl }).
            success(function(data, status, headers, config) {
            done(status,data);
          }).
            error(function(data, status, headers, config) {
            done(status,data);
          });
  };
  AccountsService.prototype.deleteAccountById = function(accountId,done){
          var deleteAccountByIdUrl = middlewareUrl + "/accounts/" + accountId;
          $http({method: 'DELETE',url: deleteAccountByIdUrl }).
            success(function(data, status, headers, config) {
            done(status,data);
          }).
            error(function(data, status, headers, config) {
            done(status,data);
          });
  };

  return new AccountsService();

});
