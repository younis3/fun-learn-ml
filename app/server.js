const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config({ path: './.env' });

const app = express();

/*
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE
});
*/

//------------------------------------------------------------------------


app.use(session({
  secret: process.env.SESS_SECRET,
  resave: false,
  saveUninitialized: true
}));



app.get('/', (req, res) => {
  sess = req.session;
  if (sess.username) {
    res.redirect('/homepage');
  }
  else {
    res.render('index');
  }
});



const publicDir = path.join(__dirname, './public');
app.use(express.static(publicDir));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cookieParser());

app.set('view engine', 'hbs');



//Define Routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));







app.listen(3000);

