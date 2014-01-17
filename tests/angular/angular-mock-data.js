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
              { 'id' : '707f4f77bcf86cd799439012','name' : 'Test-1','description' : 'Sample description'},
              { 'id' : '127f1f77bcf86cd799439012','name' : 'Test-2', 'description' : 'Sample description2'}
            ],
            'createNodePOST' : { 'type' : '707f4f77bcf86cd799439012' },
            'createNodePOSTNegative' : { 'type' : '707f4f77bcf86cd799439012' },

          //accountsSearchPage: accountsSearch by username result data  
            'accountsSearchByUsernameGETParam': 'testUser',
            'negaccountsSearchByUsernameGETParam': 'abc',     
             'accountsGET':
                [{
                  'id': '1234567890qwertyuiopasdf', 
                  'identities': [{
                     'provider': 'github', 
                     'userName': 'testUser',
                  },
                  {
                     'provider': 'bitbucket', 
                     'userName': 'testUser',
                }]
                }],
              'negAccountsGET': [],

          //accountPage: account data
          'accountIdGETParam': '1234567890qwertyuiopasdf',
          'negAccountIdGETParam': '1234512345qwertyuiopasdf',
          'accountGET' :
            {
              'id': '1234567890qwertyuiopasdf',
              'lastUsedIdentityId' : '000000000000000000000001',
              systemRoles: ['superUser'], 
              identities: [{
                  id: '000000000000000000000001',
                  providerId: '1234567', 
                    firstName: 'test',
                    lastName: 'User',
                    userName: 'testUser',
                    displayName: 'Test User',
                    avatarUrl: 'https://gravatar.com/avatar/0123728ec9578b1c8b9312d0793fcc5c?d=https%3A%2F%2Fidenticons.github.com%2Fd5ba1029dd185f7281e29374bc3c928e.png&r=x',
                    avatarId: '0123728ec9578b1c8b9312d0793fcc5c',
                    provider: 'github'  
              }]
            },
          'negAccountGET' : {},
          
          //subscriptionsPage > subscriptions:test-data
          'subscriptionsGET': [{
                  id: '123f1f77bcf86cd799439011',
                  name: 'Free Plan',
                  plan: '0000000000000000000000000000000X',
                  projects: ['testProject'],
                  containers: ['507f1f77bcf86cd799439011'],
                  owners: ['testOwner'],
                  created: '2013-Dec-01 13:54 PM (PST)',
                  updated: '2014-Jan-03 22:54 PM (PST)'
              }],
          'negSubscriptionsGET': [ ],
          
          //subscriptionsPage >  plan:test-data
          'planIdGETParam': '0000000000000000000000000000000X',
          'negPlanIdGETParam': '0000000000000000000000000000000Y',
          'planGET': 
              {
                id: '0000000000000000000000000000000X',
                name: 'Free',
                nodesQuota: 1,
                privateProjectsQuota: 1,
                storageGigaBytesQuota: 1
              },
           'negPlanGET': {}
      }

