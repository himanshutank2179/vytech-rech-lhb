const express = require('express');
const mongoose = require('mongoose');
const config = require('../../config');
const router = express.Router();
const jsonwebtoken = require('jsonwebtoken');
const Order = require('../models/Order');

mongoose.Promise = global.Promise;
mongoose.connect(config.database, function (err) {
    if (err) {
        console.error(' Error in connect to db! ' + err);
    } else {
        console.log('connected to the database');
    }
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
// parameter{user_id, branch_id[], category_id[], service_id[], service_time[], employee_id[]}
router.post('/checkout', function (req, res) {
    var branch_id = req.body.branch_id;
    var order = new Order();
    res.send(branch_id[0]);


});


module.exports = router;