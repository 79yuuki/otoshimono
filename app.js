'use strict';

var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var RedisStore = require('connect-redis')(session);

var routes = require('./routes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

var url = require('url');
var parsed_url = url.parse(process.env.REDISTOGO_URL || 'http://localhost:6379');
var parsed_auth = (parsed_url.auth || '').split(':');
console.log(parsed_url, '#####', parsed_auth);
app.use(session({
  secret: 'otoshimono',
  store: new RedisStore({
    host: parsed_url.hostname,
    port: parsed_url.port,
    pass: parsed_auth[1],
    ttl: 1000000
  })
}));

// facebook login
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

var FACEBOOK_APP_ID = "734337516630340";
var FACEBOOK_APP_SECRET = "6bc43f6db0a4dcd1e09d92a0acecd4ad";
var CALLBACK_URL;
if (process.env.REDISTOGO_URL) {
  CALLBACK_URL = "http://otoshimono.herokuapp.com/auth/facebook/callback";
} else {
  CALLBACK_URL = "http://localhost:3000/auth/facebook/callback";
}

passport.serializeUser(function(user, done){
  done(null, user);
});
passport.deserializeUser(function(obj, done){
  done(null, obj);
});

passport.use(new FacebookStrategy({
  clientID: FACEBOOK_APP_ID,
  clientSecret: FACEBOOK_APP_SECRET,
  callbackURL: CALLBACK_URL
}, function(accessToken, refreshToken, profile, done){
  process.nextTick(function(){
    return done(null, profile);
  });
}));


// setup routes
routes.setup(app);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
