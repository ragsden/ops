var config = require('../config');
/*
 * GET home page.
 */
//Cleanup..
exports.index = function(req, res){
  res.render('index', { title: 'Shippable: Ops-Dashboard' });
}; 
exports.home = function(req,res) {
  
    //if(req.user) 
    {
    	console.log('xx  ' + config);
    	res.render('home', { config : config  });
    }
    //else {
	//  res.render('index', { title: 'Shippable: Ops-Dashboard' });

    //}

    

  //  res.render('home',{ user: 'Logged in user here..'} );

};
