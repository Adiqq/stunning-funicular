const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3');

const index = require('./routes/index');
const users = require('./routes/users');
const flats = require('./routes/flats');

const app = express();

const db = new sqlite3.Database('db/db.sqlite3');
db.run(`
CREATE TABLE IF NOT EXISTS Flats(
Id TEXT PRIMARY KEY,
UserId TEXT NOT NULL,
City TEXT NOT NULL,
Street TEXT NOT NULL,
NumberOfRooms INTEGER NOT NULL,
RoomArea INTEGER NOT NULL,
Floor TEXT NOT NULL,
HasBalcony INTEGER NOT NULL,
Description TEXT NOT NULL
)
`);
db.run(`
CREATE TABLE IF NOT EXISTS Pictures(
Id TEXT PRIMARY KEY,
FlatId TEXT NOT NULL,
Filename TEXT NOT NULL,
Filetype TEXT NOT NULL
)
`);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/', index);
app.use('/users', users);
app.use('/flats', flats);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
  next(err);
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
