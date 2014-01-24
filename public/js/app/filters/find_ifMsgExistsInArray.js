angular.module('angSpa').filter('find_msg', function() {
  return function(msg,array) {
    for(var i in array)
    {
    	if(array[i]===msg)
    	{
    		return true;
    	}
    }
  }
});