var should = require('should');
var auth = require('../../auth');
var sinon = require('sinon');
var config = require('../../config');
var request = require('request');
var passport = require('passport');
var nock = require('nock');
var mock = require('./node-mock-data');
var underscore = require('underscore');
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
        //Use nock to mockout the API call to GET /account.
        //Let it return a account Object that has super user set..
        var nockObj = nock(config.middleware.endPoint)
                        .post("/accounts/tokens")
                        .reply(200,mock.testData.tokenObject);

        // Call the function that will invoke the API. 
        // assert if the data recieved has got the correct privelages
        auth.getShippableToken('github_access_token',function(err,data) {
            should(err).equal(null);
            should(data.token).equal('1234-5678-9012-3456');
            //IMPORTANT: This ensures nock was in the picture when the 
            //test ran.
            nockObj.done();
        });
    });

    it('positive test for a super user account',function() {
        //Use nock to mockout the API call to GET /account.
        //Let it return a account Object that has super user set..
        var nockObj = nock(config.middleware.endPoint)
                        .get("/account")
                        .reply(200,mock.testData.accountProfile);

        // Call the function that will invoke the API. 
        // assert if the data recieved has got the correct privelages
        auth.getAccountForToken('test_token',function(err,account) {
            should(err).equal(null);
            should(account.systemRoles[0]).equal('superUser');
            //IMPORTANT: This ensures nock was in the picture when the 
            //test ran.
            nockObj.done();
        });


        
    });
    it('negative test for a super user account',function() {

        //Use nock to mockout the API call to GET /account.
        //Let it return a account Object that has super user set..
        var nockObj = nock(config.middleware.endPoint)
                        .get("/account")
                        .reply(200,mock.testData.nonSuperUserAccountProfile);

        // Call the function that will invoke the API. 
        // assert if the data recieved has got the correct privelages
        auth.getAccountForToken('test_token',function(err,account) {
            should(err).equal(null);
            var valid = underscore.contains(account.systemRoles,"superUser");
            should(valid).equal(false);
            //IMPORTANT: This ensures nock was in the picture when the 
            //test ran.
            nockObj.done();
        });


    });
});
