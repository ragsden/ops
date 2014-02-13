describe('TestingQueues Service',function() {
  var httpBackend;
  var queuesService;
  var bootstrapped = false;
  beforeEach(function() {
    module('angSpa');
    inject(function($httpBackend,QueuesService) {
      if(!bootstrapped) {
        httpBackend = $httpBackend;
        httpBackend.when('GET',config.MW_URL+'/subscriptions/'+testData.test_subsId + '/queues')
        .respond(200,testData.testQueuesData);
        httpBackend.when('GET',config.MW_URL+'/subscriptions/'+testData.negtest_subsId + '/queues')
        .respond(400,testData.getQueuesErr);

        httpBackend.when('PUT',config.MW_URL+'/queues/'+ testData.queueName)
        .respond(testData.clearQueueReturnStatus, testData.clearQueueReturnData);
        httpBackend.when('PUT',config.MW_URL+'/queues/'+testData.negQueueName)
        .respond(testData.clearNegQueueReturnStatus, testData.clearNegQueueReturnData);

        queuesService = QueuesService;
        bootstrapped = true;
      }
    });

  });

  it('gets the queues by subID',function() {
    var result ;
    queuesService.getQueuesBySubId(testData.test_subsId,function(err,data) {
      result = data;
    });
    httpBackend.flush();
    expect(result[0].name).toBe(testData.testQueuesData[0].name);
    expect(result[0].pending_acks).toBe(testData.testQueuesData[0].pending_acks);
  });

  it('checks for error for invalid subId',function() {
    var result ;
    queuesService.getQueuesBySubId(testData.negtest_subsId,function(err,data) {
      result = data;
    });
    httpBackend.flush();
    expect(result).toBe("Error getting the Queues Information.");
  });

  it('clear queue by a valid queue name', function(){
    var statusReceived;
    queuesService.clearQueueByQueueName(testData.queueName, function(status, data){
      statusReceived = status;
    });
    httpBackend.flush();
    expect(statusReceived).toBe(200);
  });

  it('clear queue by a invalid queue name', function(){
    var statusReceived;
    queuesService.clearQueueByQueueName(testData.negQueueName, function(status, data){
      statusReceived = status;
    });
    httpBackend.flush();
    expect(statusReceived).toBe(400);
  });

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });
});
