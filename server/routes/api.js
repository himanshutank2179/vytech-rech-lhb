const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
var config = require('../../config');
const User = require('../models/User');


mongoose.Promise = global.Promise;
mongoose.connect(config.database, function (err) {
    if (err) {
        console.error(' Error in connect to db! ' + err);
    } else {
        console.log('connected to the database');
    }
});
router.get('/', function (req, res) {
    res.send('api work');
});


/////////////////////////////////
////// USERS WS /////////////////
////////////////////////////////

//USER REGISTER WS
router.post('/signup', function (req, res) {
    console.log('@User register');
    var newUser = new User();
    newUser.first_name = req.body.first_name;
    newUser.last_name = req.body.last_name;
    newUser.email = req.body.email;
    newUser.username = req.body.username;
    newUser.password = req.body.password;
    newUser.phone = req.body.phone;
    newUser.address = req.body.address;

    newUser.save(function (err, insertedUser) {
        if (err) {
            console.log('Error in user signup');
        } else {
            res.json(insertedUser);
        }
    });
});

module.exports = router;
