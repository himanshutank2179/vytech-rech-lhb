/*const express = require('express');
const router = express.Router();*/
const router = require('express-promise-router')();

//Importing controllers
const ServiceController = require('../../controllers/ServiceController');



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






//////////// Routes Start from here //////////////////////
router.route('/service/create')
    .post(ServiceController.create);

router.route('/service').get(ServiceController.index) // will get all branches

router.route('/service/:service_id')
    .get(ServiceController.view) // will get single service obj based on id
    .patch(ServiceController.update) // will update that particuler record/document based on id
    .delete(ServiceController.delete); // will delete that perticular record/document based on id


// get Service By Category And Branch for mobile app
router.route('/services/:category').get(ServiceController.getServiceByCategory);


module.exports = router;