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
  var loginUser = req.session.passport.user;
  if (loginUser) {
    res.render('message', {id: id, loginUser: loginUser, guestUser: null});
  } else {
    // guest user
    // TODO redis から id: guest を引っ張ってきてあったら表示。無ければ名前登録前profileにredirect?
    var guestUser = redis.hget(id, 'guest');
    loginUser = redis.hget(id, 'facebook');
    if (guestUser) {
      res.render('message', {id: id, loginUser: loginUser, guestUser: guestUser});
    } else {
      res.redirect('/profile/' + id);
    }
  }
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
      return res.json({ list: JSON.parse(redis.lrange('message:'+id, 0, length))});
    } else {
      return res.json({ list: {} });
    }
  });
});

module.exports = router;
