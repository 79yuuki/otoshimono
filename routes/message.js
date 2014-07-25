'use strict';

var express = require('express');
var router = express.Router();

router.get('/:id', function(req, res){
  // TODO 最初にユーザーデータをejsに渡すか、REST APIでクライアンtjsから取ってきてもらうか
  // TODO check id format
  var id = req.param('id');
  var loginUser = req.session.passport.user;
  console.log('message========', loginUser);
  if (loginUser) {
    res.render('message', {id: id});
  } else {
    // guest user
    // TODO redis から id: guest を引っ張ってきてあったら表示。無ければ名前登録前profileにredirect?
    console.log(req.session);
  }
});

module.exports = router;
