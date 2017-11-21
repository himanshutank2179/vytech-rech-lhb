const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jsonwebtoken = require('jsonwebtoken');
var config = require('../../config');
const User = require('../models/User');
const Branch = require('../models/Branch');
const secretKey = config.secretKey;

function createToken(user) {
    var token = jsonwebtoken.sign({
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        username: user.username,
        phone: user.phone,
    }, secretKey);
    return token;
}


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
            res.json({'status': 200, 'message': 'User has been registered!'});
        }
    });
});

/////////////////////////////////
////// LOGIN WS /////////////////
////////////////////////////////
router.post('/login', function (req, res) {
    User.findOne({
        email: req.body.email
    }).select(['password', 'username', 'email', 'first_name', 'last_name'])
        .exec(function (err, user) {
            if (err) throw err;

            if (!user) {
                res.send({'status': 404, 'message': 'login failed.'});
            } else if (user) {
                var validPassword = user.comparePassword(req.body.password);
                if (!validPassword) {
                    res.send({'status': 404, 'message': 'Invalid credentials.'});
                } else {
                    //generating web token...
                    var token = createToken(user);
                    res.json({
                        status: 200,
                        message: "successfuly login!",
                        data: user,
                        token: token
                    });
                }
            }
        });
});

module.exports = router;


