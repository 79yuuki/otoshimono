'use strict';

var express = require('express');
var router = express.Router();
var redis = require('../lib/redis');

router.get('/:id', function(req, res){
  // TODO check id format
  var id = req.param('id');
  if (!id) {
    return res.redirect('/');
  }
//  var loginUser = req.session.passport.user;
  // guest user
  redis.hget(id, 'guest', function(err, guestUser){
    if (err) {
      return res.render('error', err);
    }
    redis.hget(id, 'facebook', function(err, loginUser){
      if (err) {
        return res.render('error', err);
      }
      if (guestUser) {
        res.render('message', {id: id, loginUser: JSON.parse(loginUser), guestUser: guestUser});
      } else {
        res.render('message', {id: id, loginUser: loginUser, guestUser: null});
      }
    });
  });
});

router.post('/comment', function(req, res){
  var id = req.param('id');
  var comment = req.param('comment');
  var userName = req.param('user');
  if (!id) {
    return res.json({ error: "ID is none" });
  }
  if (comment) {
    redis.rpush('message:' + id, JSON.stringify({comment: comment, user: userName, time: Date.now()}));
    return res.json({comment: comment});
  } else {
    return res.json({error: "comment text is none"});
  }
});

router.post('/list', function(req, res){
  var id = req.param('id');
  if (!id) {
    return res.json({error: 'ID is none'});
  }
  redis.llen('message:' + id, function(err, length){
    if (err) {
      return res.json({error: 'Redis llen error'});
    }
    if (length > 0) {
      redis.lrange('message:'+id, 0, length, function(err, list){
        if (err) {
          return res.render('error', err);
        }
        return res.json({ list: list });
      });
    } else {
      return res.json({ list: {} });
    }
  });
});

module.exports = router;
