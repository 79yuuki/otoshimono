'use strict';

var express = require('express');
var fs = require('fs');
var path = require('path');
var router = express.Router();

//var FacebookStrategy = require('passport-facebook').Strategy;

// default routes
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

var setup = function(app){
  app.use('/', router);
  fs.readdirSync(__dirname).forEach(function(filename){
    if (path.extname(filename) === '.js' && filename !== 'index.js') {
      var jsname = path.basename(filename, '.js');
      app.use('/' + jsname, require('./' + filename));
    }
  });
};

exports.setup = setup;
