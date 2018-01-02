const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('db/db.sqlite3');
const passport = require('passport');

router.get('/:year/:month', passport.authenticate('basic', {session: false}), function (req, res, next) {
    if (req.user.Role === 'Administrator') {
        const lastday = function(y,m){
            return  new Date(y, m +1, 0).getDate();
        };
        const year = parseInt(req.params.year);
        const month = parseInt(req.params.month) - 1;
        db.all(`SELECT FlatId, Created FROM FlatOffers WHERE Status = $status`, {
            $status: 'Accepted'
        }, (err, rows) => {
            if(err){
                res.status(500).send('Something went wrong');
            }
            if(rows){
                const filtered = rows.filter(row => {
                    const date = Date.parse(row.Created);
                    const minDate = new Date(year, month, 1);
                    const maxDate = new Date(year, month, lastday(year, month));
                    return date >= minDate && date <= maxDate;
                });
                if(filtered.length) {
                    let counter = filtered.length - 1;
                    let price = 0;
                    let area = 0;
                    for (let i = 0; i < filtered.length; i++) {
                        db.get(`SELECT Price, RoomArea FROM Flats WHERE Id = $flatId`, {
                            $flatId: filtered[i].FlatId
                        }, (err,row) =>{
                            price += parseInt(row.Price);
                            area += parseInt(row.RoomArea);
                            counter--;
                            if(counter === 0  && !res.headersSent){
                                res.json({
                                    count: filtered.length,
                                    area: area / filtered.length,
                                    price: price / filtered.length
                                })
                            }
                        })
                    }
                } else{
                    res.status(404).send('Brak sprzedaży dla podanego okresu.');
                }
            }
        })
    } else {
        res.status(401).send('Insufficient privileges');
    }
});

module.exports = router;