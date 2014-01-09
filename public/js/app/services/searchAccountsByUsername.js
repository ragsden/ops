angSpa.factory('searchAccountsByUsername',function($http){
  var middlewareUrl = config.MW_URL; 
  var SearchAccounts = function(){
   var data1= "";
   } 
   SearchAccounts.prototype.searchAccounts = function(githubId,token,done){
    if(config.runMode=="TEST")
     {
        var exp= [{
            id: "123456", // The Shippable account id
            identities: [{
                provider: "github", // `github` or `bitbucket`
                userName: "swati730", // The user name supplied by the identity provider
               }]
          },{
            id: "78910", 
            identities: [{
                provider: "github", 
                userName: "swatigoyal", 
               }]
          }]
          //  var data1="Error";
          //  done(data1);    //To test error condition
        done(null,exp);
     }
   else
    {
      var serachAccountsUrl = middlewareUrl + "accounts/search" + githubId
      $http({method: 'GET', url: searchAccountsUrl, headers : {Authorization:'token'+ token}}).
       success(function(data, status, headers, config) {
       done(null,data);
        }).
       error(function(data, status, headers, config) {
       var data1="You entered a wrong id!"
         done(data1);
       });
    };
 };
   return new SearchAccounts();
});