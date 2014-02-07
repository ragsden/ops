angular.module('angSpa').filter('filterAccountsByUsername', function(){
  return function(identityProvider, username, accountsList) {
    var i, j, k, accsListLength = accountsList.length;
    for(i=0; i < accsListLength ; i++){
      j = i;
      console.log(accountsList[j]);
      console.log(accountsList[j].identities.length);
      for(k=0; k < accountsList[j].identities.length; k++){
        var m = k;
        if(accountsList[j].identities[m].provider === identityProvider && accountsList[j].identities[m].userName === username){
          var account = accountsList.splice(j,1);
          if(account){
            return account[0];
          }
        }       
      }
    }
  };
});
