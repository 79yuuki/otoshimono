var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
  res.send('GET /hoge');
});

router.get('/fuga', function(req, res){
  res.json({hoge: 'fuga'});
});

router.get('/fuga/:id', function(req, res){
  var id = req.param('id');
  res.json({id: id});
});

module.exports = router;
