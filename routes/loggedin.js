'use strict';

var express = require('express');
var router = express.Router();

router.get('/:id', function(req, res){
  // TODO check id format
  var id = req.param('id');
  res.render('loggedin', {id: id});
});

module.exports = router;
