
/**
 * Module dependencies.
 */

 
runapp();


function runapp() {
   var express = require('express')
            , routes = require('./routes')
            , http = require('http')
            , passport = require('passport')
            , clientSessions = require("client-sessions")
            , path = require('path')
            , config = require('./config')
            , mongoose = require('mongoose')
            , auth = require('./auth');
          var app =exports.app =  express();
          auth.init();
          app.set('port', config.port || 3000);
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
          app.use(function(err, req, res, next){
            res.status(err.status || 500);
            res.render('500', { error: err });
          });
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

          mongoose.set('debug', true);
          mongoose.connect(config.db.host);
          var shouldRetry = true;

          mongoose.connection.on('error', function(error) {
            console.log("Mongodb connection error: " + error);
            if (shouldRetry) {
              setTimeout(function() {
                mongoose.connect(config.db.host);
              }, 1000);
            }
          });

          ///TODO: only proceed if messagequeue is connected
          mongoose.connection.once('open', function() {
            console.log("MongoDB connected");
            shouldRetry = false;
            });
          

          // Routes


          app.get('/',routes.home);
           app.get('/logout', function(req, res){
              req.logout();
              res.cookie(config.shippableTokenIdentifier,'');
              res.redirect('/');
          });
          app.get('/auth/github',
                passport.authenticate('github',{'scope':'repo,user:email' }),function(req,res) { });
          app.get('/auth/github/callback',
                  passport.authenticate('github',{ failureRedirect: '/' }),
                  function(req,res) {
                      res.cookie(config.shippableTokenIdentifier,JSON.stringify(req.user));
                      res.redirect('/accounts');
                  }
                  );
          app.use(function(req, res, next){

              console.log('default route');

              if(req.user) {
                res.render('home', { config : config  });   
              }
              else {
                res.redirect('/');
              }
          });
          http.createServer(app).listen(app.get('port'), function(){
            console.log('Express server listening on port ' + app.get('port'));
          });


}
