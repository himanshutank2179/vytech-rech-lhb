const User = require('../server/models/User');
const Branch = require('../server/models/Branch');
const Order = require('../server/models/Order');
const jsonwebtoken = require('jsonwebtoken');
var config = require('../config');
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

module.exports = {
    index: async (req, res, next) => {
        const users = await User.find().populate('branch');
        res.json({
            status: 200,
            data: users,
        });
    },

    view: async (req, res, next) => {
        const user_id = req.params.user_id;
        const user = await User.findOne({_id: user_id});
        res.json({status: 200, data: user});
    },

    update: async (req, res, next) => {
        const {user_id} = req.params;
        const newUser = req.body;
        const result = await User.findByIdAndUpdate(user_id, newUser);
        res.json({status: 200, message: 'user updated success.'});
    },

    newUser: async (req, res, next) => {
        const branchId = req.body.branch_id;
        var newUser = new User(req.body);
        if (branchId) {
            const branch = await Branch.findById({_id: branchId});
            newUser.branch = branch;
        }

        const user = await newUser.save();
        res.status(200).json({status: 200, data: user});
    },

    login: async (req, res, next) => {
        const email = req.body.email;
        const password = req.body.password;
        const user = await User.findOne({email});

        if (!user) {
            res.send({'status': 404, 'message': 'login failed.'});
        } else if (user) {
            var validPassword = user.comparePassword(password);
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

    },

    getEmployees: async (req, res, next) => {
        const {branch_id, time} = req.params;
        const users = await User.find({branch: branch_id});
        res.json({
            status: 200,
            data: users,
        });

    },

    fbLogin: async (req, res, next) => {
        const email = req.body.email;
        const user = await User.find({email});
        if (user.length == 0) {
            var newUser = new User(req.body);
            newUser.password = 1234567890;
            newUser.user_type = 4;
            const user = await newUser.save();

            //generating web token...
            var token = createToken(user);
            res.json({
                status: 200,
                message: "successfuly login!",
                data: user,
                token: token
            });
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
    },

    spendMony: async (req, res, next) => {
        const user_id = req.params.user_id;
        console.log(user_id);
        const total_price = await Order.aggregate([
            { $match: {
                user: user_id
            }},

            { $group: {
                _id: "$_id",
                total_price: { $sum: "$total" }
            }}
        ]);
        res.json({
            status: 200,
            data: total_price,
        });
    }
};
