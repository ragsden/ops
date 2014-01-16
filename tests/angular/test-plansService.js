describe('Testing plans-service module', function(){
  var httpBackend;
  var plansServ;
  var bootstrapped = false;
  beforeEach(function(){
    module('angSpa');
    inject(function($httpBackend, plansService){
        if(!bootstrapped){
            httpBackend = $httpBackend;
            httpBackend.when('GET', config.MW_URL + '/plans/' + testData.planIdGETParam)
            .respond(200, testData.planGET);
            httpBackend.when('GET', config.MW_URL + '/plans/' + testData.negPlanIdGETParam)
            .respond(404, testData.negPlanGET);

            plansServ = plansService;
            bootstrapped = true;
        }
    });
  });
 

  it('testing- get plan using valid planId', function(){
    var planObj;
    plansServ.getPlanByPlanId(testData.planIdGETParam, function(err, data){
        planObj = data;
    });

    httpBackend.flush();
    expect(planObj.id).toBe('0000000000000000000000000000000X');
    expect(planObj.name).toBe('Free');
    expect(planObj.nodesQuota).toBe(1);
    expect(planObj.privateProjectsQuota).toBe(1);
    expect(planObj.storageGigaBytesQuota).toBe(1);
  });   

  it('testing- get plan using invalid planId', function(err, data){
    var negPlanObj;
    plansServ.getPlanByPlanId(testData.negPlanIdGETParam, function(err, data){
        negPlanObj = data;
    });

    httpBackend.flush();
    expect(negPlanObj).toBe(null);
  
  });
  
});
