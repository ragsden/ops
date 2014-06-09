/**
 * Module dependencies.
 */

runapp();

function runapp() {
  var express = require('express')
    , routes = require('./routes')
    , http = require('http')
    , passport = require('passport')
    , logger = require("./lib/logger")
    , clientSessions = require("client-sessions")
    , path = require('path')
    , config = require('./config')
    , mongoose = require('mongoose')
    , stats = require('./lib/stats/stats')
    , auth = require('./auth');
  var app = exports.app = express();
  auth.init();
  stats.init();
  app.set('port', config.port || 3000);
  app.set('ipaddress', config.ipaddress || "127.0.0.1");

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
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('500', { error: err });
  });
  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/');
  }

  app.configure('development', function () {
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  });

  app.configure('production', function () {
    app.use(express.errorHandler());
  });

  // Routes

  app.get('/test', function (req, res) {
    res.json({ 'data': 'test'});
  });
  app.get('/', routes.home);
  app.get('/logout', function (req, res) {
    req.logout();
    res.cookie(config.shippableTokenIdentifier, '');
    res.redirect('/');
  });
  app.get('/auth/github',
    passport.authenticate('github', {'scope': 'repo,user:email' }), function (req, res) {
    });
  app.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/' }),
    function (req, res) {
      res.cookie(config.shippableTokenIdentifier, JSON.stringify(req.user));
      res.redirect('/accounts');
    }
  );
  app.use(function (req, res, next) {

    console.log('default route');

    if (req.user) {
      res.render('home', { config: config  });
    }
    else {
      res.redirect('/');
    }
  });

  /*
  //Analytics routes
  var analytics = require('./routes/analytics');
  analytics.init(app);
*/

  if (config.hostPlatform === "docker") {
    http.createServer(app).listen(app.get('port'), function () {
      logger.info('%s: Node server started on %s:%d ...', Date(Date.now()), app.get('port'));
    });
  } else {
    http.createServer(app).listen(app.get('port'), app.get('ipaddress'), function () {
      logger.info('%s: Node server started on %s:%d ...', Date(Date.now()), app.get('ipaddress'), app.get('port'));
    });
  }
}
