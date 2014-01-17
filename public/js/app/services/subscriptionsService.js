angSpa.factory('subscriptionsService',function($http){
 var middlewareUrl = config.MW_URL;
 var subscriptionsService = function(){
     subscriptionsService.prototype.getSubscriptionsByAccountId = function(accountId, done){
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


     subscriptionsService.prototype.deleteSubscriptionBySubId = function(subId, done){
        var subsUrl = middlewareUrl + "/subscriptions/" + subId;
        $http({ method: 'DELETE', url: subsUrl}).
        success(function(data, status, headers, config) {
          done(null, status);
        }).
        error(function(data, status, headers, config) {
          var message = "Error in deleting subscription using Subscription Id";
          done(message, null);
        });
     };

   };

   return new subscriptionsService();

});
