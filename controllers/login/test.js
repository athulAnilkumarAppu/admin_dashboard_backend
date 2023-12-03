var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
const cors = require('cors');
const mongoose = require("mongoose");
require("dotenv").config();
app.set('view engine', 'jade');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');


var indexRouter = require('./routes/index');
const accessTokenSecret = 'token';
const refreshTokenSecret = 'refreshtoken';
var refreshTokens = [];

app.use(cors());
app.use(bodyParser.json());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(process.env.MONGODB_URL,
  // mongoose.connect("mongodb+srv://nxdbadmin:2wDYKnNrLxbZJxg@qaptur-v2-dev-cluster.akq3h.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      // useFindAndModify: false,
      retryWrites: true,
      w: "majority",
    }
  );
   
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error: "));
  db.once("open", function () {
    console.log("DB Connected successfully");
  });

  var authUsers = require('./controller/auth.controller');

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
      const token = authHeader.split(' ')[1];

      jwt.verify(token, accessTokenSecret, (err, user) => {
          if (err) {
              return res.sendStatus(403);
          }

          req.user = user;
          next();
      });
  } else {
      res.sendStatus(401);
  }
};



app.post('/login', async (req, res) => {
  // read username and password from request body
  //const { username, password } = req.body;
  
  //console.log(cred.body.username)
  // filter user from the users array by username and password
  //const user = users.find(u => { return u.username === username && u.password === password });
  var user1 = await authUsers.list(req);

  if (user1?.username !== undefined) {
      // generate an access token
      const accessToken = jwt.sign({ username: user1.username}, accessTokenSecret, { expiresIn: '20m' });
      const refreshToken = jwt.sign({ username: user1.username}, refreshTokenSecret, {expiresIn: '1d'});

      refreshTokens.push(refreshToken);
      console.log(accessToken
        )
        console.log(
          refreshToken)

      res.json({
          accessToken,
          refreshToken
      });
  } else {
      //res.send('Username or password incorrect');
      res.status(403).send({ "status": true, responsecode: 403, message: 'Username or password incorrect'});
  }
});

app.post('/token', (req, res) => {
  const { refreshToken, username } = req.body;

  if (!refreshToken) {
      return res.sendStatus(401);
  }

  if (!refreshTokens.includes(refreshToken)) {
      return res.sendStatus(403);
  }

  jwt.verify(refreshToken, refreshTokenSecret, (err, user) => {
      if (err) {
          return res.sendStatus(403);
      }

      var accessToken = jwt.sign({ username: username}, accessTokenSecret, { expiresIn: '2m' });
      accessToken = accessToken
      res.json({
          accessToken
      });
  });
});

app.post('/logout', (req, res) => {
  const { token } = req.body;

refreshTokens = refreshTokens.filter(item => item !== token)
  res.send("Logout successful");
});

app.use('/',auth, indexRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;