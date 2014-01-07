angSpa.factory('searchUser',function($http,RUN_MODE){
   var SearchUser = function(){
   var data1= "";
   } 
   SearchUser.prototype.getUsers = function(githubId,token,done){
    if(RUN_MODE=="dev")
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
      $http({method: 'GET', url: 'http://mw.shippable.com/accounts/search/'+githubId,headers : {Authorization:'token'+ token}}).
       success(function(data, status, headers, config) {
       done(null,data);
        }).
       error(function(data, status, headers, config) {
       var data1="You entered a wrong id!"
         done(data1);
       });
    };
 };
   return new SearchUser();
});
