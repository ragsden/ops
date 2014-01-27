angular.module('angSpa').filter('delete_msg', function() {
  return function(msg,array) {
   for(var i = array.length - 1; i >= 0; i--){
        if(array[i] == msg){
        array.splice(i,1);
        }
     }
  };
});