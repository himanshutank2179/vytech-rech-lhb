const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const config = require('../../config');
const Branch = require('../models/Branch');
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
    res.send('api work on branch route');
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
////// ADD BRANCH WS ////////////
////////////////////////////////

//ADD BRANCH WS
router.post('/add-branch', function (req, res) {
    console.log('@add-branch');
    var branch = new Branch();
    branch.name = req.body.name;

    branch.save(function (err, insertedBranch) {
        if (err) {
            console.log('Error in add branch');
        } else {
            res.json({'status': 200, 'message': 'branch inserted!'});
        }
    });
});

router.get('/branches', function (req, res) {
    Branch.find({}, function (err, branches) {
        if (err) {
            res.send(err);
            return;
        }
        res.json(branches);
    });
});

module.exports = router;