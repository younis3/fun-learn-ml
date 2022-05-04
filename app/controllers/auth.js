const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const e = require("express");


const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE
});

//---------------------------------------------------------------------------



//Login
exports.login = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
      return res.status(400).render('index', {
        message: 'Please type both username and password'
      })
    }

    db.query('SELECT * FROM users WHERE user_name = ?', [username], async (err, results) => {
      //console.log(results);
      if (!results.length) {
        res.status(401).render('index', {
          message: 'User Name does not exist!'
        });
      }
      else {
        if (!(await bcrypt.compare(password, results[0].password))) {
          res.status(401).render('index', {
            message: 'Password is incorrect'
          });
        }
        else {    //successfully logged in
          const id = results[0].user_id;
          const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
          });

          console.log("The token is: " + token);

          const cookieOptions = {
            expires: new Date(
              Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
            ),
            httpOnly: true
          }
          res.cookie('jwt', token, cookieOptions);

          //save data to session
          req.session.userid = results[0].user_id;
          req.session.username = results[0].user_name;
          req.session.score = results[0].score;
          console.log("sess: " + req.session.username);

          res.redirect('/homepage');
        }
      }

    })

  } catch (err) {
    console.log(err);
  }
}







//Register
exports.register = (req, res) => {
  console.log(req.body);

  const username = req.body.username;
  const email = req.body.email;
  const pass1 = req.body.password;
  const pass2 = req.body.password2;
  const lang = req.body.lang;

  db.query('SELECT user_name, email FROM users WHERE user_name =? OR email = ?', [username, email], async (error, results) => {
    if (error) {
      console.log(error);
    }
    else {
      console.log(results);
      if (results.length > 0) {
        let msg = "";
        if (results[0].user_name == username) {
          msg = "User Name already taken";
        }
        else if (results[0].email == email) {
          msg = "Email already in use";
        }
        return res.render('register', {
          message: msg
        })
      }
      else if (pass1 !== pass2) {
        return res.render('register', {
          message: 'Passwords do not match'
        });
      }
    }

    //if no problems.. save data to database
    let hashedPass = await bcrypt.hash(pass1, 8);
    console.log(hashedPass);

    db.query('INSERT INTO users SET ?', { user_name: username, email: email, password: hashedPass, games_completed: '', language: lang }, (err, results) => {
      if (err) {
        console.log(err);
      }
      else {
        console.log(results);
        return res.render('register', {
          message_success: "User successfully registered"
        });
      }
    })

  });

  //res.send("Form submitted");
};






//Change Username
exports.changeUserName = (req, res) => {
  const userid = req.session.userid;
  const newusername = req.body.newusername;

  db.query('SELECT user_name FROM users WHERE user_name = ?', [newusername], async (error, results) => {
    if (error) {
      console.log(error);
    }
    else {
      console.log(results);
      if (results.length > 0) {
        console.log("Error username already exists");
        req.session.errormsg = 'Username already exists';
        return res.redirect('/change_username');
      }

      //if no problems.. save new username to database
      db.query('UPDATE users SET user_name = ? WHERE user_id = ?', [newusername, userid], (err, results) => {
        if (err) {
          console.log(err);
        }
        else {
          console.log(results);
          req.session.username = newusername;
          console.log("User Name successfully has been changed");
          res.redirect('/settings');
        }
      });
    }
  });

};






//Change Password
exports.changePassword = (req, res) => {
  const userid = req.session.userid;
  const oldpass = req.body.password;
  const newPass1 = req.body.password_new1;
  const newPass2 = req.body.password_new2;

  if (newPass1 !== newPass2) {
    req.session.errormsg = 'Passwords do not match';
    return res.redirect('/change_pass');
  }

  db.query('SELECT password FROM users WHERE user_id = ?', [userid], async (err, results) => {
    if (err) {
      console.log(err);
    }
    else {
      if (!(await bcrypt.compare(oldpass, results[0].password))) {
        req.session.errormsg = 'Old Password is incorrect';
        return res.redirect('/change_pass');
      }

      //if no problem with passwords.. save new password to database
      let hashedPassNew = await bcrypt.hash(newPass1, 8);
      db.query('UPDATE users SET password = ? WHERE user_id = ?', [hashedPassNew, userid], (err, results) => {
        if (err) {
          console.log(err);
        }
        else {
          console.log('changed password successfully');
          res.redirect('/logout')
        }
      });
    }
  });

}

