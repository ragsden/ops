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
    expect(subsArray[0].plan).toBe('0000000000000000000000000000000X');
    expect(subsArray[0].projects[0]).toBe('testProject');
    expect(subsArray[0].containers[0]).toBe('507f1f77bcf86cd799439011');
    expect(subsArray[0].owners[0]).toBe('testOwner');
    expect(subsArray[0].created).toBe('2013-Dec-01 13:54 PM (PST)');
    expect(subsArray[0].updated).toBe('2014-Jan-03 22:54 PM (PST)');       

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

  afterEach(function(){
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  }); 
});
