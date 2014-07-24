'use strict';

var express = require('express');
var router = express.Router();

router.get('/:id', function(req, res){
  // TODO 最初にユーザーデータをejsに渡すか、REST APIでクライアンtjsから取ってきてもらうか
  // TODO check id format
  var id = req.param('id');
  res.render('message', {id: id});
});

module.exports = router;
