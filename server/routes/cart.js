/*const express = require('express');
const router = express.Router();*/
const router = require('express-promise-router')();
//Importing controllers
const CartController = require('../../controllers/CartController');



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




//add to cart
router.route('/cart/add-to-cart').post(CartController.create);

//get cart by user_id
router.route('/cart-items/:user_id').get(CartController.index);

router.route('/cart-empty/:user_id').delete(CartController.empty_cart);

router.route('/cart/:cart_id').delete(CartController.delete);






module.exports = router;