'use strict';

var express = require('express');
var router = express.Router();

router.get('/:id', function(req, res){
  // TODO check id format
  var id = req.param('id');
  res.cookie('id', id);
  res.render('login', {id: id});
});

module.exports = router;
