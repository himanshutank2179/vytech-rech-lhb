const express = require('express');
const mongoose = require('mongoose');
const config = require('../../config');
const Service = require('../models/Service');
const router = express.Router();
const jsonwebtoken = require('jsonwebtoken');

mongoose.Promise = global.Promise;
mongoose.connect(config.database, function (err) {
    if (err) {
        console.error(' Error in connect to db! ' + err);
    } else {
        console.log('connected to the database');
    }
});
router.get('/', function (req, res) {
    res.send('api work on service route');
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

//ADD BRANCH WS
router.post('/add-service', function (req, res) {
    console.log('@add-service');
    var service = new Service();

    service.name = req.body.name;
    service.image = req.body.image;
    service.price = req.body.price;
    service.interval_time = req.body.interval_time;
    service.branch_id = req.body.branch_id;
    service.category_id = req.body.category_id;


    service.save(function (err, insertedService) {
        if (err) {
            console.log('Error in add service');
        } else {
            res.json({'status': 200, 'message': 'service inserted!'});
        }
    });
});




module.exports = router;