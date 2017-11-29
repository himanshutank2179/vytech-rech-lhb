const express = require('express');
const mongoose = require('mongoose');
const config = require('../../config');
const router = express.Router();
const jsonwebtoken = require('jsonwebtoken');
const Order = require('../models/Order');
const OrderDetails = require('../models/OrderDetails');

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
    var user_id = req.body.user_id;
    var order_detail = req.body.order_detail;

    var order = new Order();
    order.user_id = user_id;
    order.status = 1;
    order.save(function (err, insertedOrder) {
        if (err) {
            console.log('Error in add service' + err);
        } else {
            order_detail.forEach(function (orderDetail, index, arr) {
                // res.json(orderDetail);
                var od = new OrderDetails();
                od.order_id = insertedOrder.order_id;
                od.branch_id = orderDetail['branch_id'];
                od.category_id = orderDetail['category_id'];
                od.service_id = orderDetail['service_id'];
                od.employee_id = orderDetail['employee_id'];
                od.service_price = orderDetail['service_price'];
                od.service_time = orderDetail['service_time'];
                od.save(function (err, insertedOd) {
                    if (err) {
                        res.json({'status': 500, 'message': 'error in storing order details.'});
                    }
                });
            })
            res.json({'status': 200, 'message': 'Order inserted successfully!'});
        }
    });


});


module.exports = router;