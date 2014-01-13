describe('Testing getSubscriptions service module', function(){
  // accountId, dependencies
  var httpBackend;
  var getSubscriptions;
  var bootstrapped = false;
  beforeEach(function(){
    module('angSpa');
    inject(function($httpBackend, getSubscriptions){
        if(!bootstrapped){
            httpBackend = $httpBackend;
            httpBackend.when('GET', config.MW_URL + '/accounts/' + testData.accountIdGETParam + '/subscriptions')
            .respond(200, testData.subscriptionsGET);
            httpBackend.when('GET', config.MW_URL + '/accounts/' + testData.negAccountIdGETParam + '/subscriptions')
            .respond(404, testData.negSubscriptionsGET);

            getSubscriptions = getSubscriptions;
            bootstrapped = true;
        }
    });
  });
  
  // tests
  it('test- get the subscriptions using accountId');
  
});
