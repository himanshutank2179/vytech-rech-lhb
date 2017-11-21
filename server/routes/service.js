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


/////////////////////////////////
////// SERVICES BY branch_id AND category_id ///
////////////////////////////////
router.get('/all-services', function (req, res) {
    Service.find({}, '_id name',function (err, services) {
        if (err) {
            res.send(err);
            return;
        }
        res.json(services);
    });
});

/////////////////////////////////
////// ADD SERVICE WS /////////////////
////////////////////////////////

//ADD SERVICE WS
router.post('/service', function (req, res) {
    console.log('@add-service');
    var service = new Service();

    service.name = req.body.name;

    service.save(function (err, insertedService) {
        if (err) {
            console.log('Error in add service');
        } else {
            res.json({'status': 200, 'message': 'service inserted!'});
        }
    });
});


module.exports = router;