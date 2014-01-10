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

    it('should use middleware API to get the shippable token');

});