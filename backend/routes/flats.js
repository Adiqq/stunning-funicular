const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3');
const uuidv4 = require('uuid/v4');

const multer = require('multer');
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
/* GET flats listing. */
router.get('/', function (req, res, next) {
    let flats = [];
    let counter = 0;
    db.each(`SELECT Id, UserId, City, Street, NumberOfRooms, RoomArea, Floor, HasBalcony, Description, Price
    FROM Flats`, [], (err, row) => {
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
router.post('/', upload.array('pictures'), function (req, res, next) {
    //console.log(req);
    let flatId = uuidv4();
    let userId = uuidv4();
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
        $floor: req.body.floor,
        $hasBalcony: req.body.hasBalcony === true ? 1 : 0,
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
