const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3');
const uuidv4 = require('uuid/v4');

const multer = require('multer');
const passport = require("passport");
const db = new sqlite3.Database('db/db.sqlite3');

const {check, validationResult} = require('express-validator/check');
const {matchedData, sanitize} = require('express-validator/filter');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        console.log(file);
        cb(null, file.fieldname + '-' + Date.now())
    }
});

const upload = multer({storage: storage});

router.get('/offers', passport.authenticate('basic', {session: false}),
    function (req, res, next) {
        let counter = 0;
        let offers = [];
        db.all(`SELECT Id FROM Flats WHERE UserId = $id`, {
            $id: req.user.Id
        }, (err, rows) => {
            if (err) {
                res.status(400).send('Error on selecting flats');
                console.error(err);
            } else if (!rows.length) {
                res.json(offers);
            }
            else {
                counter = rows.length;
                for (let i = 0; i < rows.length; i++) {
                    db.get(`SELECT SourceUserId, FlatId, Created, Status FROM FlatOffers
                WHERE FlatId = $flatId AND Status = 'Pending'`, {
                        $flatId: rows[i].Id
                    }, (err, row) => {
                        if (err) {
                            counter--;
                            console.error(err);
                        } else if (!row) {
                            counter--;
                            if (counter === 0) {
                                res.json(offers);
                            }
                        }
                        else {
                            db.get('SELECT Id, PhoneNumber FROM Users WHERE Id = $id', {
                                $id: row.SourceUserId
                            }, (err, user) => {
                                counter--;
                                if (err) console.error(err);
                                if (user) {
                                    row.User = user;
                                    offers.push(row);
                                }
                                if (counter === 0) {
                                    res.json(offers);
                                }

                            });
                        }

                    })
                }
            }
        });
    });

router.post('/offers', passport.authenticate('basic', {session: false}),
    function (req, res, next) {
        db.get(`SELECT Id, UserId FROM Flats WHERE Id = $id`, {
            $id: req.body.id
        }, (err, row) => {
            if (err) {
                res.status(400).send('Error on selecting flat');
                console.error(err);
            }
            if (row) {
                if (row.UserId === req.user.Id) {
                    res.status(422).send(`User can't create offer on own flat.`);
                }
                else {
                    db.all(`SELECT SourceUserId, Status FROM FlatOffers WHERE FlatId = $flatId`, {
                        $flatId: row.Id
                    }, (err, rows) => {
                        if (rows.some(row => row.Status === 'Accepted')) {
                            res.status(422).send('Flat is already sold.');
                        } else if (rows.some(row => row.Status === 'Pending' && row.SourceUserId === req.user.Id)) {
                            res.status(422).send('User offer on this flat is already pending.')
                        } else {
                            let date = new Date();
                            db.run(`INSERT INTO FlatOffers(SourceUserId, FlatId, Created, Status)
                       VALUES($userId, $flatId, $created, 'Pending')`, {
                                $userId: req.user.Id,
                                $flatId: row.Id,
                                $created: date.toISOString()
                            }, (err) => {
                                if (err) {
                                    res.status(422).send('Error on flat offer insert');
                                    console.error(err);
                                } else {
                                    res.send('ok');
                                }
                            })
                        }
                    })
                }
            } else {
                res.status(404).send('Flat not found');
            }
        });
    });

router.put('/offers', passport.authenticate('basic', {session: false}),
    function (req, res, next) {
        db.get(`SELECT Id, UserId FROM Flats WHERE Id = $id AND UserId = $userId`, {
            $id: req.body.flatId,
            $userId: req.user.Id
        }, (err, row) => {
            if (err) {
                res.status(422).send("Error occured on selecting flat");
                console.error(err);
            } else {
                db.run(`
                UPDATE FlatOffers
                SET Status = 'Accepted'
                WHERE SourceUserId = $sourceUserId AND
                FlatId = $flatId AND CREATED = $created`, {
                    $sourceUserId: req.body.sourceUserId,
                    $flatId: req.body.flatId,
                    $created: req.body.created
                }, (err) => {
                    if (err) {
                        res.status(422).send('Error occured on accept');
                        console.error(err);
                    } else {
                        res.send('ok');
                    }
                })
            }
        });
    });

router.delete('/offers', passport.authenticate('basic', {session: false}),
    function (req, res, next) {
        db.get(`SELECT Id, UserId FROM Flats WHERE Id = $id AND UserId = $userId`, {
            $id: req.body.flatId,
            $userId: req.user.Id
        }, (err, row) => {
            if (err) {
                res.status(422).send("Error occured on selecting flat");
                console.error(err);
            } else {
                db.run(`
                UPDATE FlatOffers
                SET Status = 'Rejected'
                WHERE SourceUserId = $sourceUserId AND
                FlatId = $flatId AND Created = $created`, {
                    $sourceUserId: req.body.sourceUserId,
                    $flatId: req.body.flatId,
                    $created: req.body.created
                }, (err) => {
                    if (err) {
                        res.status(422).send('Error occured on delete');
                        console.error(err);
                    } else {
                        res.send('ok');
                    }
                })
            }
        });
    });


router.get('/', passport.authenticate('basic', {session: false}),
    function (req, res, next) {
        let flats = [];
        let counter = 0;
        db.each(`SELECT Id, UserId, City, Street, NumberOfRooms, RoomArea, Floor, HasBalcony, Description, Price
    FROM Flats`, [], (err, row) => {
            row.HasBalcony = !!row.HasBalcony;
            counter++;
            db.all(`SELECT Id,FlatId,Filename,Filetype FROM Pictures WHERE FlatId = $flatId`, {
                $flatId: row.Id
            }, (err, rows) => {
                row.Pictures = rows;
                db.all(`SELECT SourceUserId,Status FROM FlatOffers WHERE FlatId = $flatId`, {
                    $flatId: row.Id
                }, (err, rows) => {
                    row.Sold = rows.some(row => row.Status === 'Accepted');
                    row.Pending = rows.some(row => row.SourceUserId === req.user.Id && row.Status === 'Pending');
                    counter--;
                    flats.push(row);
                    if (counter === 0 && !res.headersSent) {
                        return res.json(flats);
                    }
                })
            });

        });

    });

router.post('/',
    passport.authenticate('basic', {session: false}),
    upload.array('pictures'), [
        check('city').exists().withMessage('Miasto jest wymagane'),
        check('street').exists().withMessage('Ulica jest wymagana'),
        check('numberOfRooms').exists().withMessage('Liczba pokoi jest wymagana'),
        check('numberOfRooms').exists().custom(value => parseInt(value) > 0).withMessage('Liczba pokoi musi być większa od 0'),
        check('roomArea').exists().withMessage('Powierzchnia mieszkania jest wymagana'),
        check('roomArea').exists().custom(value => parseInt(value) > 0).withMessage('Powierzchnia musi być większa od 0'),
        check('floor').exists().withMessage('Piętro jest wymagane'),
        check('floor').exists().custom(value => parseInt(value) >= 0 && parseInt(value) <= 5).withMessage('Nieprawidłowe piętro'),
        check('hasBalcony').exists().withMessage('Podaj informację o obecności balkonu'),
        check('description').exists().withMessage('Opis jest wymagany'),
        check('price').exists().withMessage('Cena jest wymagana'),
        check('price').exists().custom(value => parseInt(value) > 0).withMessage('Cena musi być wyższa od 0')
    ],
    function (req, res, next) {
        if (!req.files.length) {
            return res.status(422).send('Zdjęcie jest wymagane')
        }
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.mapped());
            return res.status(422).json({errors: errors.mapped()});
        }
        const flat = matchedData(req);
        //console.log(req);
        let flatId = uuidv4();
        let userId = req.user.Id;
        let counter = req.files.length + 1;
        db.run(`INSERT INTO Flats(
    Id, UserId, City, Street, NumberOfRooms, RoomArea, Floor,
     HasBalcony, Description, Price)
    VALUES($id,$userId,$city,$street,$numOfRooms,$roomArea,$floor,
    $hasBalcony, $description, $price)`, {
            $id: flatId,
            $userId: userId,
            $city: flat.city,
            $street: flat.street,
            $numOfRooms: flat.numberOfRooms,
            $roomArea: flat.roomArea,
            $floor: parseInt(flat.floor),
            $hasBalcony: flat.hasBalcony === 'true' ? 1 : 0,
            $description: flat.description,
            $price: flat.price
        }, (err) => {
            counter--;
            if (counter === 0) {
                res.send('ok');
            }
        });
        for (let i = 0; i < req.files.length; i++) {
            let pictureId = uuidv4();
            db.run(`INSERT INTO Pictures(Id,FlatId,Filename,Filetype)
    VALUES($id,$flatId,$filename,$filetype)`, {
                $id: pictureId,
                $flatId: flatId,
                $filename: req.files[i].filename,
                $filetype: req.files[i].mimetype
            }, (err) => {
                counter--;
                if (counter === 0) {
                    res.send('ok');
                }
            });
        }

    });

router.put('/',
    passport.authenticate('basic', {session: false}),
    upload.array('pictures'), [
        check('flatId').exists(),
        check('city').exists().withMessage('Miasto jest wymagane'),
        check('street').exists().withMessage('Ulica jest wymagana'),
        check('numberOfRooms').exists().withMessage('Liczba pokoi jest wymagana'),
        check('numberOfRooms').exists().custom(value => parseInt(value) > 0).withMessage('Liczba pokoi musi być większa od 0'),
        check('roomArea').exists().withMessage('Powierzchnia mieszkania jest wymagana'),
        check('roomArea').exists().custom(value => parseInt(value) > 0).withMessage('Powierzchnia musi być większa od 0'),
        check('floor').exists().withMessage('Piętro jest wymagane'),
        check('floor').exists().custom(value => parseInt(value) >= 0 && parseInt(value) <= 5).withMessage('Nieprawidłowe piętro'),
        check('hasBalcony').exists().withMessage('Podaj informację o obecności balkonu'),
        check('description').exists().withMessage('Opis jest wymagany'),
        check('price').exists().withMessage('Cena jest wymagana'),
        check('price').exists().custom(value => parseInt(value) > 0).withMessage('Cena musi być wyższa od 0')
    ],
    function (req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.mapped());
            return res.status(422).json({errors: errors.mapped()});
        }
        const flat = matchedData(req);
        console.log(flat);
        //console.log(req);
        let userId = req.user.Id;
        db.get(`SELECT UserId FROM Flats WHERE Id = $id`, {
            $id: flat.flatId
        }, (err, row) => {
            if (err) {
                console.error(err);
                return res.status(500).send(`Can't select flat`);
            }
            if (row) {
                if (row.UserId !== userId) {
                    return res.status(401).send('Not owner of flat');
                }
                let picturesToDelete = [];
                if (req.body.picturesToDelete) {
                    picturesToDelete = req.body.picturesToDelete.split(',');
                }
                let counter = req.files.length + picturesToDelete.length + 1;
                db.run(`UPDATE Flats
                        SET City = $city, Street = $street, NumberOfRooms = $numOfRooms, RoomArea = $roomArea,
                        Floor = $floor, HasBalcony = $hasBalcony, Description = $description, Price = $price
                        WHERE Id = $id
                        `, {
                    $id: flat.flatId,
                    $city: flat.city,
                    $street: flat.street,
                    $numOfRooms: flat.numberOfRooms,
                    $roomArea: flat.roomArea,
                    $floor: parseInt(flat.floor),
                    $hasBalcony: flat.hasBalcony === 'true' ? 1 : 0,
                    $description: flat.description,
                    $price: flat.price
                }, err => {
                    counter--;
                    if (counter === 0) {
                        res.send('ok');
                    }
                });
                for (let i = 0; i < req.files.length; i++) {
                    let pictureId = uuidv4();
                    db.run(`INSERT INTO Pictures(Id,FlatId,Filename,Filetype)
                            VALUES($id,$flatId,$filename,$filetype)`, {
                        $id: pictureId,
                        $flatId: flat.flatId,
                        $filename: req.files[i].filename,
                        $filetype: req.files[i].mimetype
                    }, err => {
                        counter--;
                        if (counter === 0) {
                            res.send('ok');
                        }
                    });
                }
                for (let i = 0; i < picturesToDelete.length; i++) {
                    let pictureId = picturesToDelete[i];
                    db.run(`DELETE FROM Pictures
                        WHERE Id = $id AND FlatId = $flatId`, {
                        $id: pictureId,
                        $flatId: flat.flatId
                    }, err => {
                        counter--;
                        if (counter === 0) {
                            res.send('ok');
                        }
                    });
                }

            } else {
                return res.status(422).send('Flat not found');
            }
        });

    });

router.delete('/:flatId',
    passport.authenticate('basic', {session: false}),
    function (req, res, next) {
        const userId = req.user.Id;
        const flatId = req.params.flatId;
        db.get(`SELECT UserId FROM Flats WHERE Id = $id`, {
            $id: flatId
        }, (err, row) => {
            if (err) {
                console.error(err);
                return res.status(500).send(`Can't select flat`);
            }
            if (row) {
                if (row.UserId !== userId) {
                    return res.status(401).send('Not owner of flat');
                }
                let counter = 3;
                db.run(`DELETE FROM Flats
                    WHERE Id = $flatId`, {
                    $flatId: flatId
                }, err => {
                    if(err) console.error(err);
                    counter--;
                    if (counter === 0 && !res.headersSent) {
                        return res.send('ok');
                    }
                });
                db.run(`DELETE FROM Pictures
                    WHERE FlatId = $flatId`, {
                    $flatId: flatId
                }, err => {
                    if(err) console.error(err);
                    counter--;
                    if (counter === 0 && !res.headersSent) {
                        return res.send('ok');
                    }
                });
                db.run(`DELETE FROM FlatOffers
                    WHERE FlatId = $flatId`, {
                    $flatId: flatId
                }, err => {
                    if(err) console.error(err);
                    counter--;
                    if (counter === 0 && !res.headersSent) {
                        return res.send('ok');
                    }
                });
            } else {
                return res.status(422).send('Flat not found');
            }
        });

    });

module.exports = router;
