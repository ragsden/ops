
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
    res.render('home',{ user: 'Logged in user here..'} );
    }
    else {
     res.render('index', { title: 'Shippable: Ops-Dashboard' });

    }

    

  //  res.render('home',{ user: 'Logged in user here..'} );

};
