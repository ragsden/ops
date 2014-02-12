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
      					'state':0,
      					'nodeType':'707f1f77bcf86cd799439012',
      					'created': '2014-01-20T13:46:52.104Z',
      					'updated': '2014-01-20T13:46:52.104Z'
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
          
          //list of subscriptions
          'test_subsId' : '123f1f77bcf86cd799439011',
          'negtest_subsId': '12345677bcf86cd799439011',
          'subscriptionsGET': [{
                  id: '123f1f77bcf86cd799439011',
                  name: 'Free Plan',
                  plan: '0000000000000000000000000000000X',
                  projects: ['testProject'],
                  containers: ['507f1f77bcf86cd799439011'],
                  owners: ['testOwner'],
                  created: '2013-Dec-01 13:54 PM (PST)',
                  updated: '2014-Jan-03 22:54 PM (PST)',
                  card: '312f1f77bcf86cd799439011',
                  nodes: ["52eb38625ca8940f00f33483","52eb3956c163030f00afd2a2"],
                  storageBytesUsed:'479430877',
                  privateProjectsCount:0,
              }],
          'negSubscriptionsGET': [ ],
          
          //plan details 
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
           'negPlanGET': {},

           //delete subscription
           'subIdDELParam': '123f1f77bcf86cd799439011',
           'negSubIdDELParam':'12345677bcf86cd799439011',
           'subIdDELDataReturned': 'OK',
           'negSubIdDELDataReturned': 'Not OK',


          //getProjects By Subscription Id
           'subscriptionProjectsGETParam': '123f1f77bcf86cd799439011',
           'negsubscriptionProjectsGETParam':'12345677bcf86cd799439011',
           'subscriptionProjectsGET':
               [{
                    created:"2014-01-20T07:53:56.491Z",
                    id:"52d7c18af0412511007af7f7",
                    language:"Python",
                    name:"boto:2.0_stable",
                    nodeType:"ubuntu1204",
                    repositoryKey:"xyz/boto",
                    repositoryProvider:"github",
                    repositoryUrl:"git@github.com:xyz/boto.git",
                    subscription:"123f1f77bcf86cd799439011",
                    permissions:[{
                      account:"1234567890qwertyuiopasdf",
                      roles:["projectOwner"]
                     }]
                 }],
           'negsubscriptionProjectsGET': [],

           //get project by project id - returns
           'projectIdGETParam': "52d7c18af0412511007af7f7",
           'projectGETByProjectId': {
                    id:"52d7c18af0412511007af7f7",
                    name:"boto:2.0_stable",
                    nodeType:"ubuntu1204",
                    buildCount: 5,
                    repositoryKey:"xyz/boto",
                    repositoryProvider:"github",
                    repositoryUrl:"git@github.com:xyz/boto.git",
                    isPrivateRepository: false,
                    permissions:[{
                      account:"1234567890qwertyuiopasdf",
                      roles:["projectOwner"]
                     }],
                    created:"2014-01-20T07:53:56.491Z",
                    updated:"2014-02-20T07:50:50.381Z",
                 },
           
           'projectId': "52d7c18af0412511007af7f7",
           'projectUpdate': {
                    name:"boto:2.0_stable",
                    nodeType:"ubuntu1204",
                    subscription:"123f1f77bcf86cd799439011",
                    permissions:[{
                      account:"1234567890qwertyuiopasdf",
                      roles:["projectOwner"]
                     },{
                      account:"0987654321qwertyuiopasdf",
                      roles:["buildAdmin"]
                     }],
                 },
           'projectUpdateReturns': 'OK',

           'testProjectId' : '52d7c18af0412511007af7f7',
           'negTestProjectId' : '52d7c19af0412511007af9f9',
            'testProjectData' : [
                {
                  buildNumber: 1,
                  project: '123456789012345',
                  phase: 1,
                  status: 'Finished',
                  duration: 12345,
                  size: 4567,
                  commitUrl: 'http://commiturl.url',
                  committerLogin: 'ofcourseme',
                  commitSha: '12345678124',
                  repositorySize: 3466,
                  repositoryFileCount: 12, 
                  buildYml: 'hsaTml',
                  lastAuthorEmail: 'hjd@afhj.com',
                  lastCommitAuthorEmail: 'sjdf@asgf.com',
                  lastCommitShortDescription: 'short',
                  triggeredByAccount: 'thecccount'
                }
            ],
            'negsubscriptionProjectsGET': [],

          //delete Project By Id
           'projectIdDELParam': '52d7c18af0412511007af7f7',
           'negProjectIdDELParam':'52d7c18af0512411007af7f7',
           'projectIdDELDataReturned': 'OK',
           'negProjectIdDELDataReturned': 'Not OK',

           'testBuildNumber' : '1',
           'buildnumberDELDataReturned' : 'OK',
           'testBuildData' :
            {
             'console' : [{
                'output' : 'The build finished successfully!'
             }],
            },

           'postBuildByProjectId' : { 'buildNumbers' : 1 },


           'testCardId': '312f1f77bcf86cd799439011',
           'negtestCardId': '312f1f77bcf86cd799439022',
           'testCardData': {
             id: "312f1f77bcf86cd799439011",
             lastFourDigits: "4321",
             expiry: "01/2023",
             type: "Visa Gold",
           },
           'dockerHosts' : [ { id : '',vmName : 'testhost' } ],
           'testHostId' : '712f1f77bcf86cd799439022',
           'testNodesData' : [
             {"__v":0,"_id":"12f37e2fbe2c170f008c4ed0","nodeType":"ubuntu1204","subscriptionId":"62ef5f77b9796c0f00e2b9b2","username":"cazipicogohemuhu","vmName":"ip-20-0-110-21","updated":"2014-02-06T12:21:03.956Z","created":"2014-02-06T12:21:03.955Z","nodeState":2},
             {"__v":0,"_id":"22f37e2fbe2c170f008c4ed0","nodeType":"ubuntu1204","subscriptionId":"42ef5f77b9796c0f00e2b9b2","username":"aaapicogohemuhu","vmName":"ip-20-0-110-21","updated":"2014-02-06T12:21:03.956Z","created":"2014-02-06T12:21:03.955Z","nodeState":2}
           ],

           'testQueuesData' : [{
             name : "52f87c8813e0c70f00ed6cd1.ubuntu1204",
             status: "running",
             consumers: [{
              channel_details : {
               name : "20.0.110.21:44428 -> 172.17.0.2:5672 (1)"
              }
             }],
             pending_acks: "0"
           }],
           'getQueuesErr' : "Error getting the Queues Information.",

           //clear queues
           'queueName' : '52f87c8813e0c70f00ed6cd1.ubuntu1204',
           'negQueueName': 'ABCDE52f87c8813e0c70f00e.ubuntu1204',
           'clearQueueReturnStatus': 200,
           'clearNegQueueReturnStatus': 400,
           'clearQueueReturnData': 'OK',
           'clearNegQueueReturnData': 'Not OK'

      };

