const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('db/db.sqlite3');

const {check, validationResult} = require('express-validator/check');
const {matchedData, sanitize} = require('express-validator/filter');
const passport = require('passport');

router.put('/:userId/password', passport.authenticate('basic', {session: false}), function (req, res, next) {
    if (req.user.Role === 'Administrator') {
        bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
            if (err) {
                res.status(500).send('something went wrong');
            } else {
                db.run(`
            UPDATE Users
            SET Hash = $hash
            WHERE Id = $id
            `, {
                    $id: req.params.userId,
                    $hash: hash
                }, (err) => {
                    if (err) {
                        res.status(500).send('cannot update password')
                    }
                    res.send('ok');
                });
            }
        });
    } else {
        res.status(401).send('Insufficient privileges');
    }
});

router.delete('/:userId', passport.authenticate('basic', {session: false}), function (req, res, next) {
    if (req.user.Role === 'Administrator') {
        db.run(`
            DELETE FROM Users
            WHERE Id = $id
            `, {
            $id: req.params.userId
        }, (err) => {
            if (err) {
                res.status(500).send('cannot delete user')
            }
            res.send('ok');
        });
    }
    else {
        res.status(401).send('Insufficient privileges');
    }
})
;

/* GET users listing. */
router.get('/', passport.authenticate('basic', {session: false}), function (req, res, next) {
    if (req.user.Role === 'Administrator') {
        db.all(`SELECT Id, PhoneNumber, Role FROM Users`, {}, (err, rows) => {
            res.json(rows);
        })
    } else {
        res.status(401).send('Insufficient privileges');
    }
});
router.post('/login', passport.authenticate('basic', {session: false}),
    function (req, res, next) {
        console.log('ok');
        res.json({
            Id: req.user.Id,
            Role: req.user.Role
        });
    });
router.post('/register', [
    check('email').isEmail().withMessage("musi być adresem e-mail").trim().normalizeEmail()
        .custom(value => {
            return new Promise((resolve, reject) => {
                db.get(`
            SELECT Id FROM Users WHERE Id = $id
            `, {
                    $id: value
                }, (err, row) => {
                    if (err) {
                        console.error(err);
                        reject(err)
                    }
                    if (row) {
                        console.error(row);
                        reject('E-mail już istnieje');
                    }
                    resolve(true);
                })
            });
        }),
    check('password', 'Hasło musi mieć przynajmniej 5 znaków i zawierać cyfrę.')
        .isLength({min: 5})
        .matches(/\d/),
    check('phoneNumber').isMobilePhone('pl-PL')

], function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.mapped());
        return res.status(422).json({errors: errors.mapped()});
    }
    const user = matchedData(req);
    bcrypt.hash(user.password, saltRounds, function (err, hash) {
        if (err) {
            res.status(500).send('something went wrong');
        } else {
            db.run(`
            INSERT INTO Users(Id, PhoneNumber, Hash, Role)
            VALUES($id, $number, $hash, 'User')
            `, {
                $id: user.email,
                $number: user.phoneNumber,
                $hash: hash
            }, (err) => {
                if (err) {
                    res.status(500).send('cannot add user to db')
                }
                res.send('ok');
            });
        }
    });

});

module.exports = router;
