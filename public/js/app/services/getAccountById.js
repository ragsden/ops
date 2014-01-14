angSpa.factory('getAccountById',function($http){
 var middlewareUrl = config.MW_URL;
  var GetAccountById = function(){
        };
     GetAccountById.prototype.getAccount = function(id,done){
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
              },{ 
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
        var getAccountsByIdUrl = middlewareUrl + "/accounts/" + id;
        $http({method: 'GET',url: getAccountsByIdUrl }).
        success(function(data, status, headers, config) {
          done(status,data);
        }).
        error(function(data, status, headers, config) {
          var data1="You entered a wrong id!";
          done(status,data);
        });
      }
     };
   return new GetAccountById();

});
