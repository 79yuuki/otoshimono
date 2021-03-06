'use strict';

var passport = require('passport');
var express = require('express');
var router = express.Router();
var redis = require('../lib/redis');

redis.on('error', function (err){
  console.log('redis Error: ', err);
});

// login url
router.get('/facebook', passport.authenticate('facebook'));

// callback url after facebook login
router.get('/facebook/callback',
          passport.authenticate('facebook', { failureRedirect: '/login' }),
          function(req, res){
            var id = req.cookies.id;
            var user = req.user;
            res.cookie('passport', req.user);
            if (id && user) {
              redis.hset(id, 'facebook', JSON.stringify(user));
              res.redirect('/loggedin/' + id);
            } else {
              // login failure
              res.redirect('/login');
            }
          }
          );

module.exports = router;
