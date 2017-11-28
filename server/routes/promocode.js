const express = require('express');
const mongoose = require('mongoose');
const config = require('../../config');
const Service = require('../models/Service');
const router = express.Router();
const jsonwebtoken = require('jsonwebtoken');
const Promocode = require('../models/Promocodes');

mongoose.Promise = global.Promise;
mongoose.connect(config.database, function (err) {
    if (err) {
        console.error(' Error in connect to db! ' + err);
    } else {
        console.log('connected to the database');
    }
});
router.get('/', function (req, res) {
    res.send('api work on promocode route');
});

//Creating Middleware for token valid or not checkpoint
router.use(function (req, res, next) {
    console.log('somebody just come to our app!');
    var token = req.body.token || req.param('token') || req.headers['x-access-token'];

    //check if token exist.
    if (token) {
        jsonwebtoken.verify(token, config.secretKey, function (err, decoded) {
            if (err) {
                res.json({
                    status: 403,
                    message: 'failed to authenticate user'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.json({
            status: 403,
            message: 'no token provided'
        });
    }
});

//GET ALL PROMO CODES
//parameter {service_id}
router.post('/promocodes', function (req, res) {
    Promocode.find({
        service_id: req.body.service_id,
    }, function (err, promocodes) {
        if (err) {
            res.send(err);
            return;
        }
        res.json(promocodes);
    });
});


module.exports = router;