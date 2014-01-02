
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , passport = require('passport')
  , clientSessions = require("client-sessions")
  , path = require('path')
  , auth = require('./auth');
var app =exports.app =  express();
auth.init();
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.cookieSession({ secret: 'Sh!ppable0psDashboard' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) 
  { return next(); }
      res.redirect('/');
}

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);
app.get('/home',ensureAuthenticated,routes.home);
app.get('/logout', function(req, res){
    res.redirect('/');
});
app.get('/auth/github',
      passport.authenticate('github'),function(req,res) { });
app.get('/auth/github/callback',
        passport.authenticate('github',{ failureRedirect: '/' }),
        function(req,res) {
            res.cookie('shippable-token','sample_token');
            res.redirect('/home');
        }
        );
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

