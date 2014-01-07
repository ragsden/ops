angSpa.factory('getAccountsById',function($http){
     var GetAccountById = function(){
        };
     GetAccountById.prototype.getAccountById = function(id,token,done){
     if(config.runMode=="TEST")
       {
         var data= {
              id: "123456",
              avatarId: "XXX",
              avatarUrl: "YYY",
              identities: [{
                 providerId: "1",
                 firstName: "A",
                 lastName: "B",
                 userName: "ABCD",
                 displayName: "D",
                 avatarUrl: "YYY",
                 avatarId: "XXX",
                 provider: "github"  // `github` or `bitbucket`
               }]
          };
         done(null,data);
       }
     else
      {
        $http({method: 'GET', url: 'http://mw.shippable.com/accounts/'+id,headers : {Authorization: 'token' + token}}).
        success(function(data, status, headers, config) {
          done(null,data);
        }).
        error(function(data, status, headers, config) {
          var data1="You entered a wrong id!";
          done(data1);
        });
      }
     };
   return new GetAccountById();

});
