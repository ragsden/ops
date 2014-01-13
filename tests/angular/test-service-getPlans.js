describe('Testing getPlans service module', function(){
  // planId, dependencies
  var httpBackend;
  var getPlansService;
  var bootstrapped = false;
  beforeEach(function(){
    module('angSpa');
    inject(function($httpBackend, getPlans){
        if(!bootstrapped){
            httpBackend = $httpBackend;
            httpBackend.when('GET', config.MW_URL + '/plans/' + testData.planIdGETParam)
            .respond(200, testData.planGET);
            httpBackend.when('GET', config.MW_URL + '/plans/' + testData.negPlanIdGETParam)
            .respond(404, testData.negPlanGET);

            getPlansService = getPlans;
            bootstrapped = true;
        }
    });
  });
 

  // tests
  it('test- get plan using planId', function(){
    var planObj;
    getPlansService.getPlanByPlanId(testData.planIdGETParam, function(err, data){
        planObj = data;
    });

    httpBackend.flush();
    expect(planObj.id).toBe('0000000000000000000000000000000X');
  });   
  
});
