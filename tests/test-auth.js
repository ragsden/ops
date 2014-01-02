var should = require('should');
var auth = require('../auth');
var sinon = require('sinon');
var config = require('../config');
var request = require('request');
var passport = require('passport');
var gitHubStrategy = require('passport-github').Strategy;
describe('Performs Github based authentication',function() {

it('should use passport for authentication',function() {
        var spy = sinon.spy();
        sinon.stub(passport,"use",spy);
        auth.init();
        
        //assertions
        spy.calledOnce.should.be.equal(true);

        //IMPORTANT
        passport.use.restore();
      
    });

	it('should use Github strategy for authentication',function() {
       
        var spy = sinon.spy();
        sinon.stub(passport,"use",spy);
        auth.init();
        var s = spy.args[0][0];
        should.exist(s);
        s.should.be.an.instanceOf(gitHubStrategy);
        should(s._oauth2._clientId).equal(config.passport.github.clientId);
        should(s._oauth2._clientSecret).equal(config.passport.github.secret);
        should(s._callbackURL).equal(config.passport.github.callbackUrl);
        passport.use.restore();
      
    });

    it('should use middleware API to get the shippable token',function() {
    	//Stub out request.post to return a mock token object that shippable middleware sends as a response.
    	//create a mock request body and call the method.
    	//Make sure the response has the mock response object
    	var res = { token: 'sample_token'};
    	var callback = sinon.spy();
    	sinon.stub(request,"post").yields(null,{ statusCode: 200 },JSON.stringify({ token: 'sample_token'}));

    	//auth.getShippableToken('stub_token',callback);
    	//console.log(callback.getCall(0));
    	auth.getShippableToken('stub_token',function(err,data) {
    		should(data).have.property('token');
    		should(data.token).not.equal('');
    		should(data.token).equal('sample_token');
    	});

    	request.post.restore();
    });

});