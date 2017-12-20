const express = require('express');
//const router = express.Router();
const router = require('express-promise-router')();
const User = require('../models/User');

//Importing controllers
const UsersController = require('../../controllers/UsersController');




/*mongoose.Promise = global.Promise;
mongoose.connect(config.database, function (err) {
    if (err) {
        console.error(' Error in connect to db! ' + err);
    } else {
        console.log('connected to the database');
    }
});
router.get('/', function (req, res) {
    res.send('api work');
});*/


/////////////////////////////////
////// USERS WS /////////////////
////////////////////////////////



/////////////////////////////////
////// LOGIN WS /////////////////
////////////////////////////////
// router.post('/login', function (req, res) {
//     User.findOne({
//         email: req.body.email
//     }).select(['password', 'username', 'email', 'first_name', 'last_name'])
//         .exec(function (err, user) {
//             if (err) throw err;
//
//             if (!user) {
//                 res.send({'status': 404, 'message': 'login failed.'});
//             } else if (user) {
//                 var validPassword = user.comparePassword(req.body.password);
//                 if (!validPassword) {
//                     res.send({'status': 404, 'message': 'Invalid credentials.'});
//                 } else {
//                     //generating web token...
//                     var token = createToken(user);
//                     res.json({
//                         status: 200,
//                         message: "successfuly login!",
//                         data: user,
//                         token: token
//                     });
//                 }
//             }
//         });
// });

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
////// GET EMP BY branch_id WS //
////////////////////////////////
//parameter {branch_id}
/*router.post('/get-employees', function (req, res) {
    User.find({
        user_type: 3,
        branch_id: req.body.branch_id
    }, function (err, emps) {
        if (err) {
            res.send(err);
            return;
        }
        res.json(emps);
    });
});*/





//////////////////// new parts begins from here /////////////////////////////

//USER REGISTER WS
router.route('/signup').post(UsersController.newUser);
//login ws
router.route('/login').post(UsersController.login);

router.route('/users')
    .get(UsersController.index)
    .post(UsersController.newUser);

// users/get-employees/branch_id/datetime
router.route('/users/get-employees/:branch_id/:time')
    .get(UsersController.getEmployees);

//USER REGISTER WS
router.route('/fb-login').post(UsersController.fbLogin);

router.route('/users/:user_id')
    .get(UsersController.view)



















module.exports = router;


