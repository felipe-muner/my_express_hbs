var express = require('express');
var router = express.Router();
var conn = require(process.env.PWD + '/conn');

/* GET users listing. */
router.get('/', function(req, res, next) {
  conn.acquire(function(err,con){
    con.query('SELECT * FROM User WHERE Active = 0', function(err, result) {
      con.release();
      if(err){
        console.log('entrei no erro do getUser');
        res.render('error', { error: err } );
      }else{
        console.log(result);
        res.render('index', {data:result});
      }
    });
  });
});

router.get('/disable', function(req, res, next) {
  conn.acquire(function(err,con){
    con.query('UPDATE User SET Active = 1 WHERE UserId = ?', [UserID],function(err, result) {
      con.release();
      if(err){
        console.log('entrei no erro do getUser');
        res.render('error', { error: err } );
      }else{
        console.log(result);
        res.redirect('/users');
      }
    });
  });
});

router.get('/edit', function(req, res, next) {
  conn.acquire(function(err,con){
    con.query('UPDATE User SET ? WHERE UserID = ?', [user,user.UserID], function(err, result) {
      con.release();
      if(err){
        console.log('entrei no erro do getUser');
        res.render('error', { error: err } );
      }else{
        console.log(result);
        res.render('index', {data:result});
      }
    });
  });
});

router.post('/saveUser', function(req, res, next) {
  //--------- Parse querystring to object ---------
  // var url_parts = url.parse(req.url, true);
  // var query = url_parts.query;
  //-----------------------------------------------
  conn.acquire(function(err,con){
    con.query('INSERT INTO User SET ?', [user], function(err, result) {
      con.release();
      if(err){
        console.log('entrei no erro do getUser');
        res.render('error', { error: err } );
      }else{
        console.log(result);
        res.render('index', {data:result});
      }
    });
  });
});

module.exports = router;
