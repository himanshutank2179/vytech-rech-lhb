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

/////////////////////////////////
////// GET ALL CART ITEMS BY user_id
////////////////////////////////
/*router.get('/cart-items/:user_id', function (req, res) {
    var user_id = req.params.user_id || req.param('user_id');
    if (!user_id) {
        return res.send({status: 404, message: 'Posted data is not correct or incompleted.'});
    } else {
        Cart.find({
            user_id: user_id
        }).exec(function (err, items) {
            if (err) {
                res.send(err);
                return;
            }

            var service_array = [];
            items.forEach(function (item) {
                Service.findOne({_id: item.service_id},function (err, obj) {

                });


                //items_array.push(service);
            });



            console.log(service_array);

            res.json({
                status: 200,
               // date: service_array,

            });


        });


    }
});*/

/////////////////////////////////
////// ADD TO CART WS /////////////////
////////////////////////////////



//ADD TO CART WS
/*router.post('/add-to-cart', function (req, res) {
    var cart = new Cart();
    const uid = req.body.user_id;
    const service_id = req.body.service_id;
    const price = req.body.price;

    if (!uid || !service_id || !price) {
        return res.send({status: 404, message: 'Posted data is not correct or incompleted.'});
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


});*/

//REMOVE FROM CART
/*router.delete('/remove-item/:cart_id', function (req, res, next) {
    Cart.remove({_id: req.params.cart_id}, function (err) {
        if (err) {
            res.json({status: 400, message: 'Error processing request ' + err});
        }
        res.json({
            status: 200,
            message: 'Item removed successfully'
        });
    });
});*/

//EMPTY CART

/*router.delete('/cart-empty/:user_id', function (req, res, next) {
    Cart.remove({user_id: req.params.user_id}, function (err) {
        if (err) {
            res.json({status: 400, message: 'Error processing request ' + err});
        }
        res.json({
            status: 200,
            message: 'all items removed successfully'
        });
    });
});*/






//add to cart
router.route('/cart/add-to-cart').post(CartController.create);
//get cart by user_id

router.route('/cart-items/:user_id').get(CartController.view);

router.route('/cart-empty/:user_id').delete(CartController.empty_cart);

router.route('/cart/:cart_id').delete(CartController.delete);






module.exports = router;