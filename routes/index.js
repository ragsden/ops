
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Shippable: Ops-Dashboard' })
};
exports.home = function(req,res) {
    res.render('home',{user: 'Logged in user here..'});
};
