var express = require('express');
var router = express.Router();

var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

var upload = multer({ storage: storage })
/* GET flats listing. */
router.get('/', function(req, res, next) {
    res.send('respond with flats');
});
router.post('/', upload.array('pictures'), function(req, res, next) {
    res.send('ok');
});

module.exports = router;
