const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3');
const uuidv4 = require('uuid/v4');

const multer = require('multer');
const passport = require("passport");
const db = new sqlite3.Database('db/db.sqlite3');

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
            } else{
                counter = rows.length;
                for(let i = 0; i < rows.length; i++) {
                    db.get(`SELECT SourceUserId, FlatId, Created, Status FROM FlatOffers
                WHERE FlatId = $flatId`, {
                        $flatId: row[i].Id
                    }, (err, row) => {
                        counter--;
                        if (err) {
                            console.error(err);
                        }
                        if (row) {
                            offers.push(row);
                        }
                        if(counter === 0){
                            res.json(offers);
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
                FlatId = $flatId AND CREATED = $created`, {
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
                flats.push(row);
                counter--;
                if (counter === 0) {
                    res.send(flats);
                }
            })
        });
    });

router.post('/',
    passport.authenticate('basic', {session: false}),
    upload.array('pictures'), function (req, res, next) {
        //console.log(req);
        let flatId = uuidv4();
        let userId = req.user.Id;
        db.run(`INSERT INTO Flats(
    Id, UserId, City, Street, NumberOfRooms, RoomArea, Floor,
     HasBalcony, Description, Price)
    VALUES($id,$userId,$city,$street,$numOfRooms,$roomArea,$floor,
    $hasBalcony, $description, $price)`, {
            $id: flatId,
            $userId: userId,
            $city: req.body.city,
            $street: req.body.street,
            $numOfRooms: req.body.numberOfRooms,
            $roomArea: req.body.roomArea,
            $floor: parseInt(req.body.floor),
            $hasBalcony: req.body.hasBalcony === 'true' ? 1 : 0,
            $description: req.body.description,
            $price: req.body.price
        });
        for (let i = 0; i < req.files.length; i++) {
            let pictureId = uuidv4();
            db.run(`INSERT INTO Pictures(Id,FlatId,Filename,Filetype)
    VALUES($id,$flatId,$filename,$filetype)`, {
                $id: pictureId,
                $flatId: flatId,
                $filename: req.files[i].filename,
                $filetype: req.files[i].mimetype
            });
        }

        res.send('ok');
    });

module.exports = router;
