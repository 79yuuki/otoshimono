'use strict';

var express = require('express');
var router = express.Router();
var redis = require('redis');
var client = redis.createClient();

router.get('/:id', function(req, res){
  // TODO 最初にユーザーデータをejsに渡すか、REST APIでクライアンtjsから取ってきてもらうか
  // TODO check id format
  var id = req.param('id');
  if (!id) {
    return res.redirect('/');
  }
  var loginUser = req.session.passport.user;
  console.log('message========', loginUser);
  if (loginUser) {
    res.render('message', {id: id, loginUser: loginUser, guestUser: null});
  } else {
    // guest user
    // TODO redis から id: guest を引っ張ってきてあったら表示。無ければ名前登録前profileにredirect?
    console.log(req.session);
    var guestUser = client.hget(id, 'guest');
    if (guestUser) {
      res.render('message', {id: id, loginUser: null, guestUser: guestUser});
    } else {
      res.redirect('/profile/' + id);
    }
  }
});

router.post('/comment', function(req, res){
  var id = req.param('id');
  var comment = req.param('comment');
  if (!id) {
    return res.json({ error: "ID is none" });
  }
  if (comment) {
    client.rpush('message:' + id, comment);
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
  var length = client.llen('message:' + id);
  if (length === 0) {
    return res.json({});
  } else {
    return res.json({ list: client.lrange('message:'+id, 0, length)});
  }
});

module.exports = router;
