'use strict';

var express = require('express');
var router = express.Router();
var redis = require('../lib/redis');

router.get('/:id', function(req, res){
  var id = req.param('id');
  res.cookie('id', id);
  if (!id) {
    return res.render('error', {status:503, stack: "profile id is none"});
  }

  redis.hget(id, 'facebook', function(err, loginUser){
    if (err) {
      return res.render('error',err);
    }
    if (loginUser) {
      res.render('profile', {id: id, loginUser: JSON.parse(loginUser)});
    } else {
      res.render('error', {status: 503, stack: "no login user"});
    }
  });
});

router.post('/finder', function(req, res){
  var guestName = req.param('name');
  var id = req.cookies.id;
  if (guestName && id) {
    redis.hset(id, 'guest', guestName);
    res.redirect('/message/' + id);
  } else {
    // error
    res.render('error', {status: 503, stack: "profile id is none"});
  }
});

module.exports = router;
