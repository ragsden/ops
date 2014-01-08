angular.module('angSpa').factory('NodeService',function($http) {
	var middlewareUrl = config.MW_URL;
	var NodeService = function() {
		NodeService.prototype.getNodesBySubscriptionId = function(subscriptionId,done) {
			var containerInfoUrl = middlewareUrl+"/subscriptions/"+subscriptionId+"/nodes";
			$http(
	  			{
	  				method: 'GET', 
	  				url: containerInfoUrl
	  			})
	  		.success(function(data) {
	  				done(null,data);
	  		}).error(function(data,status,headers,config) {
	  			done(status);
	  		});
		};
	};
	return new NodeService();
});
