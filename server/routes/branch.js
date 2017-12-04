const express = require('express');
// const router = express.Router();
const router = require('express-promise-router')();
const Branch = require('../models/Branch');
//Importing controllers
const BranchController = require('../../controllers/BranchController');


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

//////////////////////////////// Branches Routes starts from here ////////////////


router.route('/branch/create')
    .post(BranchController.create);

router.route('/branch').get(BranchController.index) // will get all branches

router.route('/branch/:branch_id')
    .get(BranchController.view) // will get single branch obj based on id
    .patch(BranchController.update) // will update that particuler record/document based on id
    .delete(BranchController.delete); // will delete that perticular record/document based on id


module.exports = router;