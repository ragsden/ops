var config = require('../config');
/*
 * GET home page.
 */
//Cleanup..
exports.index = function(req, res){
  res.render('index', { title: 'Shippable: Ops-Dashboard' });
}; 
exports.home = function(req,res) {
  
    if(req.user) 
    {
    	res.render('home', { config : config  });
    }
    else {
     res.render('index', { title: 'Shippable: Ops-Dashboard' });
    }

};
