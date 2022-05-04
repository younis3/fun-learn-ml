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


//Reset Score
exports.reset_score = (req, res) => {
  let username = req.session.username;
  let nw_score = 0;

  db.query('UPDATE users SET score = ? WHERE user_name = ?', [nw_score, username], (err, results) => {
    if (err) {
      console.log(err);
    }
    else {
      req.session.score = nw_score;
      console.log("Score successfully has been reset");
      res.redirect('/settings');
    }
  });

}



//Save New Score
exports.save_score = (req, res) => {
  let username = req.session.username;
  let newScore = req.body.nwscore;

  db.query('UPDATE users SET score = ? WHERE user_name = ?', [newScore, username], (err, results) => {
    if (err) {
      console.log(err);
    }
    else {
      req.session.score = newScore;
      console.log("New Score saved successfully");
      res.redirect('/ctg_play');
    }
  });
}


//Score Board
exports.score_board = (req, res) => {
  let username = req.session.username;
  let userScore = req.session.score;
  db.query('SELECT ROW_NUMBER() OVER (ORDER BY score DESC) AS rank_place, user_name, score FROM users LIMIT 15', (err, results) => {
    if (err) {
      console.log(err);
    }
    else {
      //console.log(results);
      req.session.scores = results;
      return res.render('leader_board', {
        post: {
          username: username,
          score: userScore,
          resultsArr: results
        }
      });
    }
  });

}



