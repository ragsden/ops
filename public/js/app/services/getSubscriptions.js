angSpa.factory('getSubscriptions',function($http){
 var middlewareUrl = config.MW_URL;
 var getSubscriptions = function(){
     getSubscriptions.prototype.getSubscriptionsByAccountId = function(accountId, done){
        var subsUrl = middlewareUrl + "/accounts/" + accountId + "/subscriptions";
        $http({ method: 'GET', url: subsUrl}).
        success(function(data, status, headers, config) {
          done(null,data);
        }).
        error(function(data, status, headers, config) {
          var message = "Error in getting subscriptions data using Account Id";
          done(message, null);
        });
     };
   };
   return new getSubscriptions();

});
