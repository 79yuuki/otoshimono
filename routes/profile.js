'use strict';

var express = require('express');
var router = express.Router();

router.get('/:id', function(req, res){
  var id = req.param('id');
  // TODO データ保存してあるのを取ってきて返す
  res.render('profile', {id: id});
});

module.exports = router;
