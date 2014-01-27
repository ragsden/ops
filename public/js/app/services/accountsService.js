angSpa.factory('AccountsService',function($http){
  var middlewareUrl = config.MW_URL;
  var AccountsService = function(){
  };

  AccountsService.prototype.searchAccountsByUsername = function(githubId,done){
    if(config.runMode=="TEST")
      {
        var exp= [{
          id: "123456", // The Shippable account id
          identities: [{
            provider: "github", // `github` or `bitbucket`
            userName: "swati730", // The user name supplied by the identity provider
          },{
            provider: "bitbucket",
            userName: "swati730",
          }]
        },{
          id: "78910",
          identities: [{
            provider: "github",
            userName: "swatigoyal",
          }]
        }];
        done(null,exp);
      }
      else
        {
          var searchAccountsUrl = middlewareUrl + "/accounts/search/" + githubId;
          $http({method: 'GET', url: searchAccountsUrl}).
            success(function(data,status,header,config) {
            done(null,data);
          }).error(function(data,status,headers,config) {
            done(status,data);
          });
        }
  };
  AccountsService.prototype.getAccountById = function(id,done){
    if(config.runMode=="TEST")
      {
        var data= {
          id: "123456",
          lastUsedIdentityId : '1',
          identities: [{
            id: "1",
            providerId: "1234567",
            firstName: "A",
            lastName: "B",
            userName: "ABCD",
            displayName: "D",
            avatarUrl: "YYY",
            avatarId: "XXX",
            provider: "github"  // `github` or `bitbucket`
          },{
            id:"2",
            providerId: "2",
            firstName: "A",
            lastName: "B",
            userName: "ABCD",
            displayName: "D",
            avatarUrl: "WWW",
            avatarId: "AAA",
            provider: "bitbucket"  // `github` or `bitbucket`
          }]
        };
        done(null,data);
      }
      else
        {
          var getAccountByIdUrl = middlewareUrl + "/accounts/" + id;
          $http({method: 'GET',url: getAccountByIdUrl }).
            success(function(data, status, headers, config) {
            done(null,data);
          }).
            error(function(data, status, headers, config) {
            var data1="You entered a wrong id!";
            done(status,data);
          });
        }
  };

  return new AccountsService();

});
