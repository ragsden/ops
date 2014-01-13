describe('Testing getSubscriptions service module', function(){
  // accountId, dependencies
  var httpBackend;
  var getSubs;
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

            getSubs = getSubscriptions;
            bootstrapped = true;
        }
    });
  });
 

  // tests
  it('test- get the subscriptions using accountId', function(){
    var subsArray;
    getSubs.getSubscriptionsByAccountId(testData.accountIdGETParam, function(err, data){
        subsArray = data;
    });

    httpBackend.flush();
    expect(subsArray.length).toBe(1);  
    expect(subsArray[0].id).toBe('123f1f77bcf86cd799439011');
  });   
  
});
