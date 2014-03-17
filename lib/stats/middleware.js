"use strict";
var request = require('request');
var _ = require("underscore");
exports.get = function(url, token, callback) {
    var opts = {
      method: "GET",
      url: url,
      json: true,
      headers: {}
    };

    if (token) {
      opts.headers.Authorization = "token " + token;
    }
    request(opts, function(err, response, body) {

    	if(err) {
    		callback(err,null);
    	}
      else if(response.statusCode > 200) {
        callback(response.statusCode,null);
      }
    	else {
    		callback(null,body);
    	}
   });
}

