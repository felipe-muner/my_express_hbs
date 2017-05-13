var express = require('express');
var router = express.Router();
var conn = require(process.env.PWD + '/conn');

router.get('/', function(req, res, next) {
  console.log('raiz');
  res.render('login',{layout:false})
});

router.get('/logout', function(req, res, next) {
  console.log('logout');
  req.session.destroy();
  res.render('login', {layout:false, msg : 'Logout Successfull !'})
});

router.post('/login', function(req, res, next) {
  conn.acquire(function(err,con){
    con.query('SELECT * FROM User WHERE Matricula = ?', [req.body.matricula], function(err, result) {
      con.release();
      if(err){
        res.render('error', { error: err } );
      }else{
        debugger;
        console.log(result);
        if(0 === result.length){
          res.render('login',{ layout:false , msg: 'Incorrect Matricula'})
        }else if(req.body.password !== result[0].Password){
          res.render('login',{ layout:false , msg: 'Incorrect Password'})
        }else{
          console.log('tudo certo!');
          req.session.Matricula = result[0].Matricula
          res.redirect('/panel')
        }
      }
    });
  });
});

router.get('*', function(req, res, next) {
  console.log('entrei *');
  console.log('matricula na sessao ?', req.session.matricula);
  req.session.Matricula ? next() : res.redirect('/');
});

router.get('/panel', function(req, res, next) {
  console.log('panel');
  console.log('sessao no painel', req.session);
  res.render('panel',{userSession: req.session})
});

module.exports = router;
