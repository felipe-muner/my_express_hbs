var express = require('express');
var router = express.Router();

var User = require(process.env.PWD + '/model/User');

/* GET home page. */
router.get('/user', function(req, res, next) {
  var u = new User();
  u.getUser();
  res.render('index', {});
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
