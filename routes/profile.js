'use strict';

var express = require('express');
var router = express.Router();
var redis = require('redis');
var client = redis.createClient();

router.get('/:id', function(req, res){
  var id = req.param('id');
  res.cookie('id', id);
  if (!id) {
    return res.redirect('/');
  }

  var guestUser = client.hget(id, 'guest');
  res.render('profile', {id: id, guestUser: guestUser});
});

router.post('/finder', function(req, res){
  var guestName = req.param('name');
  var id = req.cookies.id;
  if (guestName && id) {
    client.hset(id, 'guest', guestName);
    res.redirect('/message/' + id);
  } else {
    // error
    res.render('profile', {id: id, guestUser: null});
  }
});

module.exports = router;
