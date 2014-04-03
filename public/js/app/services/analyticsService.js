angSpa.factory('AnalyticsService',function($http){
  var middlewareUrl = config.MW_URL;
  var AnalyticsService = function(){
  };
  AnalyticsService.prototype.filterAccounts = function(from,to,done) {
      var url = "/analytics/accounts/filter?createdAfter="+from+"&createdBefore="+to;
          $http({method: 'GET',url: url }).
            success(function(data, status, headers, config) {
            done(status,data);
          }).
            error(function(data, status, headers, config) {
            done(status,data);
          });
  };

  AnalyticsService.prototype.getSystemAnalytics = function(done) {
      var url = "/analytics/system";
          $http({method: 'GET',url: url }).
            success(function(data, status, headers, config) {
            done(status,data);
          }).
            error(function(data, status, headers, config) {
            done(status,data);
          });
  };

  AnalyticsService.prototype.getNewAccountData = function(start,end,done) {
      var url = "/analytics/accounts/new?createdAfter="+start+"&createdBefore="+end;
      console.log(url);
          $http({method: 'GET',url: url }).
            success(function(data, status, headers, config) {
            done(status,data);
          }).
            error(function(data, status, headers, config) {
            done(status,data);
          });
  };
  return new AnalyticsService();

});
