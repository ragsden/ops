angSpa.factory('getUserProfile',function($http,App_Name){
     var GetProfile = function(){
        };
     GetProfile.prototype.getProfile = function(id,cookie,done){
     if(App_Name=="Ops Dashboard")
       {
         var data= [{
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
          }]
         done(null,data);
       }
     else
      {
        $http({method: 'GET', url: 'http://mw.shippable.com/accounts/'+id,headers : {Authorization: 'token' + cookie}}).
        success(function(data, status, headers, config) {
          done(null,data);
        }).
        error(function(data, status, headers, config) {
          var data1="You entered a wrong id!";
          done(data1);
        });
      }
     };
   return new GetProfile();

});
