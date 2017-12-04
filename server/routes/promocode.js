const express = require('express');
/*const router = express.Router();*/
const router = require('express-promise-router')();

const Promocode = require('../models/Promocodes');

const PromocodeController = require('../../controllers/PromocodeController');




//Creating Middleware for token valid or not checkpoint
/*router.use(function (req, res, next) {
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
});*/

//GET ALL PROMO CODES
//parameter {service_id}
/*router.get('/promocodes/:service_id', function (req, res) {
    var service_id = req.params.service_id || req.param('service_id');
    Promocode.find({
        service_id: service_id,
    }, function (err, promocodes) {
        if (err) {
            res.send(err);
            return;
        }
        res.json({
            status: 200,
            date: promocodes
        });
    });
});*/




///////// routes starts from here ////////////////////

router.route('/promocodes/create')
    .post(PromocodeController.create);

router.route('/promocodes').get(PromocodeController.index) // will get all branches

router.route('/promocodes/:branch_id')
    .get(PromocodeController.view) // will get single branch obj based on id
    .patch(PromocodeController.update) // will update that particuler record/document based on id
    .delete(PromocodeController.delete); // will delete that perticular record/document based o

router.route('/promocodes/:user_id')
    .get(PromocodeController.getUserPromocode);



module.exports = router;