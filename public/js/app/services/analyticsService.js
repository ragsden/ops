angSpa.factory('AnalyticsService',function($http){
  var middlewareUrl = config.MW_URL;
  var AnalyticsService = function(){
  };
  AnalyticsService.prototype.filterAccounts = function(start,end,done) {
      var url = config.SERVER_URL + "/analytics/accounts/filter?createdBefore="+start+"&createdAfter="+end;
          $http({method: 'GET',url: url }).
            success(function(data, status, headers, config) {
            done(status,data);
          }).
            error(function(data, status, headers, config) {
            done(status,data);
          });
  };

  AnalyticsService.prototype.getSystemAnalytics = function(done) {
      var url = config.SERVER_URL + "/analytics/system";
          $http({method: 'GET',url: url }).
            success(function(data, status, headers, config) {
            done(status,data);
          }).
            error(function(data, status, headers, config) {
            done(status,data);
          });
  };

  AnalyticsService.prototype.getNewAccountData = function(start,end,done) {
      var url = config.SERVER_URL + "/analytics/new?createdBefore="+start+"&createdAfter="+end;
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
