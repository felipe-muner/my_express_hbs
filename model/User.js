var conn = require(process.env.PWD + '/conn');

function User(UserID, Matricula, Pass, GrupoID, Ativo){
  this.UserID = UserID
  this.Matricula = Matricula
  this.Pass = Pass
  this.GrupoID = GrupoID
  this.Ativo = Ativo

  this.getUser = function(){
    conn.acquire(function(err,con){
      con.query('SELECT * FROM User WHERE Active = 0', function(err, result) {
        con.release();
        if(err){
          console.log('entrei no erro do getUser');
          res.render('error', { error: err } );
        }else{
          res.render('user', {});
        }
      });
    });
  }

  this.createUser = function(user){
    conn.acquire(function(err,con){
      con.query('INSERT INTO User SET ?', [novaConta], function(err, result) {
        con.release();
        if(err){
          res.render('error', { error: err } );
        }else{
          res.redirect('http://localhost:3000/user');
        }
      });
    });
  }

  this.editUser = function(user){
    conn.acquire(function(err,con){
      console.log(conta);
      con.query('UPDATE User SET Name = ?, DateBirth = ?, QtdChild = ? WHERE UserID = ?', [user.Name, user.DateBirth, user.QtdChild, user.userID], function(err, result) {
        console.log(result);
        con.release();
        if(err){
          console.log('error:::::' + err);
          res.render('error', { error: err } );
        }else{
          res.redirect('http://localhost:3000/conta/');
        }
      });
    });
  }

  this.disableUser = function(user){
    conn.acquire(function(err,con){
      con.query('UPDATE User SET Active = 1 WHERE UserID = ?', [user.UserID], function(err, result) {
        con.release();
        if(err){
          res.render('error', { error: err } );
        }else{
          res.redirect('http://localhost:3000/user/');
        }
      });
    });
  }
}

module.exports = User
