describe('Testing - subscriptions service module', function(){
  var httpBackend;
  var subsServ;
  var bootstrapped = false;
  beforeEach(function(){
    module('angSpa');
    inject(function($httpBackend, subscriptionsService){
        if(!bootstrapped){
            httpBackend = $httpBackend;
            httpBackend.when('GET', config.MW_URL + '/accounts/' + testData.accountIdGETParam + '/subscriptions')
            .respond(200, testData.subscriptionsGET);
            httpBackend.when('GET', config.MW_URL + '/accounts/' + testData.negAccountIdGETParam + '/subscriptions')
            .respond(404, testData.negSubscriptionsGET);

            httpBackend.when('DELETE', config.MW_URL + '/subscriptions/'+ testData.subIdDELParam)
            .respond(200, testData.subIdDELDataReturned);
            httpBackend.when('DELETE', config.MW_URL + '/subscriptions/'+ testData.negSubIdDELParam)
            .respond(403, testData.negSubIdDELDataReturned);

            httpBackend.when('DELETE', config.MW_URL + '/subscriptions/'+ testData.subIdDELParam + '/projects')
            .respond(200, 'OK');
            httpBackend.when('DELETE', config.MW_URL + '/subscriptions/'+ testData.negSubIdDELParam + '/projects')
            .respond(403, 'Bad Request');

            httpBackend.when('GET', config.MW_URL + '/subscriptions/'+ testData.testSubscriptionId)
            .respond(200, testData.testSubscriptionData);

            subsServ = subscriptionsService;
            bootstrapped = true;
        }
    });
  });
 

  it('testing - getSubs using valid accountId', function(){
    var subsArray;
    subsServ.getSubscriptionsByAccountId(testData.accountIdGETParam, function(err, data){
        subsArray = data;
    });

    httpBackend.flush();
    expect(subsArray.length).toBe(1);  
    expect(subsArray[0].id).toBe('123f1f77bcf86cd799439011');
    expect(subsArray[0].name).toBe('Free Plan');     

  });   

  it('testing - getSubs using Invalid accountId', function(){
    var subsNegArray;
    subsServ.getSubscriptionsByAccountId(testData.negAccountIdGETParam, function(err, data){
        subsNegArray = data;
    });

    httpBackend.flush();
    expect(subsNegArray).toBe(null);
  });

  it('testing - deleting a subscription using a valid subId', function(){
    var statusReceived;
    subsServ.deleteSubscriptionBySubId(testData.subIdDELParam, function(status, data){
        statusReceived = status;
    });
    httpBackend.flush();
    expect(statusReceived).toBe(200);
  });
 
  it('testing - deleting a subscription by invalid subId', function(){
    var statusReceived;
    subsServ.deleteSubscriptionBySubId(testData.negSubIdDELParam, function(status, data){
        statusReceived = status;
    });
    httpBackend.flush();
    expect(statusReceived).not.toBe(200);
  });

it('testing - deleting projects of subscription using a valid subId', function(){
    var statusReceived;
    subsServ.deleteProjectsBySubId(testData.subIdDELParam, function(status, data){
        statusReceived = status;
    });
    httpBackend.flush();
    expect(statusReceived).toBe(200);
  });
 
  it('testing - deleting projects of subscription by invalid subId', function(){
    var statusReceived;
    subsServ.deleteProjectsBySubId(testData.negSubIdDELParam, function(status, data){
        statusReceived = status;
    });
    httpBackend.flush();
    expect(statusReceived).not.toBe(200);
  });

it('should get subscription details for a given Id', function(){
    var result;
    subsServ.getById(testData.testSubscriptionId, function(status, data){
        result = data;
    });
    httpBackend.flush();
    expect(result.created).toBe(testData.testSubscriptionData.created);
  });


  afterEach(function(){
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  }); 
});
