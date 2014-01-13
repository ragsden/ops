  angSpa.factory('searchAccountsByUsername',function($http){
  var middlewareUrl = config.MW_URL; 
  var SearchAccounts = function(){
   var data1= "";
   } 
   SearchAccounts.prototype.searchAccounts = function(githubId,done){
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
          }]
        done(null,exp);
     }
   else
    {
      var searchAccountsUrl = middlewareUrl + "/accounts/search/" + githubId;
      $http({method: 'GET', url: searchAccountsUrl}).
      success(function(data,status,header,config) {
            done(status,data);
        }).error(function(data,status,headers,config) {
          done(status,data);
        }); 
    };
 };
   return new SearchAccounts();
});
