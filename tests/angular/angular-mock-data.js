/*
This file contains all the test data used by the tests.
*/
var config = {
        MW_URL: "http://www.example.com",
        runMode: "",
        shippableTokenIdentifier: "ops.shippable.com:token"
      }
      var testData = { 
      			'subscriptionNodesGETParameter': '123f1f77bcf86cd799439011',
      			'negativesubscriptionNodesGETParameter':'12345677bcf86cd799439011',
      			'subscriptionNodesGET' :  
      				[{
      					'id':'507f1f77bcf86cd799439011',
      					'status':'queued',
      					'type':'707f1f77bcf86cd799439012',
      					'created': '',
      					'updated': ''
      				 }
      				 ],
      			'negativesubscriptionNodesGETParameter': [ ],
            'nodeTypesGET': [
              { 'id' : '707f4f77bcf86cd799439012','name' : 'Test-1'},
              { 'id' : '127f1f77bcf86cd799439012','name' : 'Test-2'}
            ],
            'createNodePOST' : { 'type' : '707f4f77bcf86cd799439012' },
            'createNodePOSTNegative' : { 'type' : '707f4f77bcf86cd799439012' },
      
          //subscriptionsPage test-data
          'subscriptions': 
              [{
                  id: '123f1f77bcf86cd799439011',
                  name: 'Free Plan',
                  plan: '0000000000000000000000000000000X',
                  projects: ['testProject'],
                  containers: ['507f1f77bcf86cd799439011'],
                  owners: ['testOwner'],
                  created: '2013-Dec-01 13:54 PM (PST)',
                  updated: '2014-Jan-03 22:54 PM (PST)'
              }],

          'plan': 
              {
                id: '0000000000000000000000000000000X',
                name: 'Free',
                containerQuota: 1,
                privateProjectsQuota: 1,
                storageGigaBytesQuota: 1
              }
      
      }

