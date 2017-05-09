var express = require('express');
var url = require('url');
var router = express.Router();

var User = require(process.env.PWD + '/model/User');

/* GET home page. */
router.get('/user', function(req, res, next) {
  //--------- Parse querystring to object ---------
  // var url_parts = url.parse(req.url, true);
  // var query = url_parts.query;
  //-----------------------------------------------

  var u = new User();

  res.render('index', {queueUsuario: 123});
});

router.post('/createUser', function(req, res, next) {
  console.log(req.body);
  res.render('index', {});
});

router.post('/disableUser', function(req, res, next) {
  res.render('index', {});
});

router.post('/editUser', function(req, res, next) {
  res.render('index', {});
});


module.exports = router;
