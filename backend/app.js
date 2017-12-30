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

const passport = require('passport');
const Strategy = require('passport-http').BasicStrategy;

const saltRounds = 10;
const bcrypt = require('bcrypt');

const printError = (err) => {
    if (err) console.error(err);
};
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
Description TEXT NOT NULL,
Price INTEGER NOT NULL
);
`, [], printError);
db.run(`
CREATE TABLE IF NOT EXISTS Pictures(
Id TEXT PRIMARY KEY,
FlatId TEXT NOT NULL,
Filename TEXT NOT NULL,
Filetype TEXT NOT NULL
);
`, [], printError);
db.run(`
CREATE TABLE IF NOT EXISTS Roles(
Name TEXT PRIMARY KEY
);
`, [], (err) => {
    printError(err);
    db.run(`
INSERT OR IGNORE INTO Roles(Name)
VALUES('User');
`, [], printError);
    db.run(`
INSERT OR IGNORE INTO Roles(Name)
VALUES('Administrator');
`, [], printError);
    db.run(`
CREATE TABLE IF NOT EXISTS Users(
Id TEXT PRIMARY KEY,
PhoneNumber TEXT NOT NULL,
Hash TEXT NOT NULL,
Role TEXT NOT NULL,
FOREIGN KEY(Role) REFERENCES Roles(Name)
);
`, [], printError);
});

bcrypt.hash('Test@1234', saltRounds, function (err, hash) {
    db.run(`
    INSERT OR IGNORE INTO USERS(Id,PhoneNumber,Hash,Role)
    VALUES($id, $number,$hash,$role);
    `, {
        $id: 'test@test.pl',
        $number: '+48888888800',
        $hash: hash,
        $role: 'User'
    });
    db.run(`
    INSERT OR IGNORE INTO USERS(Id,PhoneNumber,Hash,Role)
    VALUES($id, $number,$hash,$role);
    `, {
        $id: 'admin@test.pl',
        $number: '+48888888801',
        $hash: hash,
        $role: 'Administrator'
    });

});

passport.use(new Strategy(
    (username, password, cb) => {
        db.get(`
            SELECT Id,Hash,Role FROM Users WHERE Id = $id
            `, {
                $id: username
            },
            (err, row) => {
                if (err) {
                    return cb(err);
                }
                if (!row) {
                    return cb(null, false);
                }
                bcrypt.compare(password, row.Hash, function (err, res) {
                    if (res) {
                        return cb(null, row);
                    } else {
                        return cb(null, false);
                    }
                });
            }
        )
    }));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    next();
});

app.use('/', index);
app.use('/users', users);
app.use('/flats', flats);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
