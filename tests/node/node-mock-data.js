exports.testData = {
	tokenObject : { token : '1234-5678-9012-3456' },
 	accountProfile : {
                              id: '123f1f77bcf86cd799439011',
                              lastUsedIdentityId: '123f1f77bcf86cd799439777', // The id of an element in the `identities` collection
                              systemRoles: ['superUser'], // Can contain `user` and `superuser`
                              identities: [{
                                id: '123f1f77bcf86cd799439777', // The id of this identity
                                providerId: '123f1f77bcf86cd799434444', // The id assigned by the identity provider for this identity
                                firstName: 'XXX',
                                lastName: 'YYY',
                                userName: 'xxxyyy',
                                displayName: 'xxxyyyzzz',
                                avatarUrl: 'http://www.avatarurl.com/a.jpg',
                                avatarId: 'a1124',
                                provider: 'github'  // `github` or `bitbucket`
                              }]
                            },
    nonSuperUserAccountProfile : {
                              id: '123f1f77bcf86cd799439011',
                              lastUsedIdentityId: '123f1f77bcf86cd799439777', // The id of an element in the `identities` collection
                              systemRoles: ['user'], // Can contain `user` and `superuser`
                              identities: [{
                                id: '123f1f77bcf86cd799439777', // The id of this identity
                                providerId: '123f1f77bcf86cd799434444', // The id assigned by the identity provider for this identity
                                firstName: 'XXX',
                                lastName: 'YYY',
                                userName: 'xxxyyy',
                                displayName: 'xxxyyyzzz',
                                avatarUrl: 'http://www.avatarurl.com/a.jpg',
                                avatarId: 'a1124',
                                provider: 'github'  // `github` or `bitbucket`
                              }]
                            }
 }

 exports.testStatsData = {
  accountStats : [{ 'accountId' : '123f1f77bcf86cd799439011','created' : '123443'},
                  { 'accountId' : 'ff3f1f77bcf86cd799439011','created' : '6423443'}
                 ]

 }