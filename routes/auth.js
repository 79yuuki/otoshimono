'use strict';

var passport = require('passport');
var express = require('express');
var router = express.Router();

// login url
router.get('/facebook', passport.authenticate('facebook'));

// callback url after facebook login
router.get('/facebook/callback',
          passport.authenticate('facebook', { failureRedirect: '/login' }),
          function(req, res){
            var id = req.cookies.id;
            if (id) {
              res.redirect('/message/' + id);
            } else {
              // login failure
              res.redirect('/login');
            }
          }
          );

module.exports = router;
