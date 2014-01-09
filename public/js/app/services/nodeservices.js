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
	  		.success(function(data,status,header,config) {
	  				done(null,data);
	  		}).error(function(data,status,headers,config) {
	  			done(status,data);
	  		});
		};

		NodeService.prototype.createNodeForSubscriptionId = function(subscriptionId,nodeType,done) {
			var nodeCreationUrl = middlewareUrl+"/subscriptions/"+subscriptionId+"/nodes";
			var postData = { type: nodeType };
			$http(
	  			{
	  				method: 'POST', 
	  				url: nodeCreationUrl,
	  				data: postData
	  			})
	  		.success(function(data,status,header,config) {
	  				done(null,data);
	  		}).error(function(data,status,headers,config) {
	  			done(status,data);
	  		});	
		};
	};
	return new NodeService();
});
