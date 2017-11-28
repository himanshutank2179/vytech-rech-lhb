const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const config = require('../../config');
const jsonwebtoken = require('jsonwebtoken');
const Cart = require('../models/Cart');

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

/////////////////////////////////
////// GET ALL CART ITEMS BY user_id
////////////////////////////////
router.get('/cart-items/:user_id', function (req, res) {
    var user_id = req.params.user_id || req.param('user_id');
    Cart.find({
        user_id: user_id
    }, function (err, items) {
        if (err) {
            res.send(err);
            return;
        }
        res.json({
            status: 200,
            date: items
        });
    });
});

/////////////////////////////////
////// ADD TO CART WS /////////////////
////////////////////////////////

module.exports = router;

//ADD TO CART WS
router.post('/add-to-cart', function (req, res) {
    var cart = new Cart();
    const uid = req.body.user_id;
    const service_id = req.body.service_id;
    const price = req.body.price;

    if (!uid || !service_id || !price) {
        return res.send({ status: 404, message: 'Posted data is not correct or incompleted.' });
    } else {
        cart.user_id = uid;
        cart.service_id = service_id;
        cart.price = price;
        cart.save(function (err, insertedItem) {
            if (err) {
                console.log('Error in add cart item');
            } else {
                res.json({'status': 200, 'message': 'cart item inserted!'});
            }
        });
    }



});