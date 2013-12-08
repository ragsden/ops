angSpa.factory('getSubscriptionsByAccountId',function($http){
 var middlewareUrl = config.MW_URL;
  var GetSubscriptionsByAccountId = function(){
        };
     GetSubscriptionsByAccountId.prototype.getSubscriptions = function(accountId,token,done){
     if(config.runMode=="TEST")
       {
         var data =  [{
                       id: 'a53535c2-fd39-42b1-9c0e-a27000a3aXXX',
                       name: 'Free Plan',
                       plan: '00000000-0000-0000-0000-00000000000X',
                       projects: ['project1'],
                       containers: ['lkjdlkfklsdlkffsdf'],
                       owners: ['vamshis'],
                       created: '2013-Dec-01 13:54 PM (PST)',
                       updated: '2014-Jan-03 22:54 PM (PST)'
                     }];

         done(null,data);
       }
     else
      {
        var subsUrl = middlewareUrl + "/accounts/" + accountId + "/subscriptions";
        $http({ method: 'GET', url: subsUrl, headers : {Authorization: 'token' + token}}).
        success(function(data, status, headers, config) {
          done(null,data);
        }).
        error(function(data, status, headers, config) {
          var message = "Error in getting subscriptions data using Account Id";
          done(message, null);
        });
      }
     };
   return new GetSubscriptionsByAccountId();

});
