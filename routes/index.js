var express = require('express');
var router = express.Router();
var conn = require(process.env.PWD + '/conn');
var Util = require(process.env.PWD + '/util/Util')
var mailSender = require(process.env.PWD + '/util/MailSender')

router.get('/', function(req, res, next) {
  res.render('login',{layout:false})
});

router.get('/logout', function(req, res, next) {
  console.log('logout');
  req.session.destroy();
  res.render('login', {layout:false, msg : 'Logout Successfull !'})
});

router.post('/emailforgetpassword', function(req, res, next) {
  conn.acquire(function(err,con){
    let randomString = Util.randomAlphaNumeric(6)
    let userToReset = req.body.matriculaOrEmail
    let sql = ''
    if(Number.isInteger(parseInt(userToReset))){
        sql = 'UPDATE User SET Password = ? WHERE Matricula = ?'
    }else{
        sql = 'UPDATE User SET Password = ? WHERE Email = ?'
    }
    con.query(sql, [randomString, userToReset], function(err, result) {
      con.release();
      if(err){
        res.render('error', { error: err } );
      }else{
        if(!!result.affectedRows){

          if(Number.isInteger(parseInt(userToReset))){
            sql = 'SELECT Email FROM User WHERE Matricula = ?'
            con.query(sql, [userToReset], function(err, result) {
              console.log('HERRR', this.sql);
              let msgMail = {};
              msgMail.from = '"Company Recover Password 👻" <foo@blurdybloop.com>'
              msgMail.to = result[0].Email
              msgMail.subject = 'Olar'
              msgMail.text = 'Hello world ?'
              msgMail.html = '<b>' + randomString + '</b>'
              msgMail.attachments = [
                                    {   // utf-8 string as an attachment
                                      filename: 'text1.txt',
                                      content: 'hello world!'
                                    },
                                    {   // binary buffer as an attachment
                                      filename: 'text2.txt',
                                      content: new Buffer('hello world!','utf-8')
                                    }
                                  ]
              mailSender(msgMail)
              res.render('qwe',{msg: 'trocou senha e enviou email'});
            })
          }else{
              let msgMail = {};
              msgMail.from = '"Company Recover Password 👻" <foo@blurdybloop.com>'
              msgMail.to = userToReset
              msgMail.subject = 'Olar'
              msgMail.text = 'Hello world ?'
              msgMail.html = '<b>' + randomString + '</b>'
              msgMail.attachments = [
                                    {   // utf-8 string as an attachment
                                      filename: 'text1.txt',
                                      content: 'hello world!'
                                    },
                                    {   // binary buffer as an attachment
                                      filename: 'text2.txt',
                                      content: new Buffer('hello world!','utf-8')
                                    }
                                  ]
              mailSender(msgMail)
              res.render('qwe',{msg: 'trocou senha e enviou email'});
          }


        }else{
          console.log('n trocou');
          res.render('qwe',{msg: 'NAO TROCOU, DEU RUIM'});
        }

      }
    });
  });
});

router.post('/login', function(req, res, next) {
  conn.acquire(function(err,con){
    con.query('SELECT * FROM User WHERE Matricula = ?', [req.body.matricula], function(err, result) {
      con.release();
      if(err){
        res.render('error', { error: err } );
      }else{
        if(0 === result.length){
          res.render('login',{ layout:false , msg: 'Incorrect Matricula'})
        }else if(req.body.password !== result[0].Password){
          res.render('login',{ layout:false , msg: 'Incorrect Password'})
        }else{
          req.session.Matricula = result[0].Matricula
          res.redirect('/panel')
        }
      }
    });
  });
});

router.get('*', function(req, res, next) {
  req.session.Matricula ? next() : res.redirect('/');
});

router.get('/panel', function(req, res, next) {
  res.render('panel',{userSession: req.session})
});

module.exports = router;
