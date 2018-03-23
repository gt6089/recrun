const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session)
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const twilio = require('twilio');
const pug = require('pug');
const moment = require('moment');
const helpers = require('./helpers');

const index = require('./routes/index');
const messages = require('./routes/messages');
const players = require('./routes/players');
const events = require('./routes/events');

// create app
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// set local helpers
app.use(function(req, res, next) {
  res.locals.h = helpers;
  next();
})

// sessions
app.use(session({
  secret: process.env.SECRET,
  store: new MongoStore({mongooseConnection: mongoose.connection})
}))

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/', index);
app.use('/messages', messages);
app.use('/players', players);
app.use('/events', events);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development'
    ? err
    : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;