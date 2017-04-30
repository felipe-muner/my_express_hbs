var express = require('express');
var router = express.Router();

var User = require(process.env.PWD + '/model/User');

/* GET home page. */
router.get('/', function(req, res, next) {
  var u = new User(1, 2595, null, 1,1);
  console.log(u);
  res.render('index', {
    User: JSON.stringify(u,null,2)
  });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'login' });
});

router.get('/admin', function(req, res, next) {
  res.render('admin', { title: 'admin' });
});

module.exports = router;
