const User = require('../server/models/User');
const Branch = require('../server/models/Branch');
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

    newUser: async (req, res, next) => {
        const branchId = req.body.branch_id;
        var newUser = new User(req.body);
        const branch = await Branch.findById({_id: branchId});
        newUser.branch = branch;
        const user = await newUser.save();
        res.status(200).json({status: 200, data: user});
    },

    login: async (req, res, next) => {
        const email = req.body.email;
        const password = req.body.password;
        const user = await User.findOne({email});
        console.log(user);
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
        const { branch_id, time } = req.params;
        const users = await User.find({branch:branch_id});
        res.json({
            status: 200,
            data: users,
        });

    }
};
