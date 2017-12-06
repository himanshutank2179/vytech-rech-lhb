const Cart = require('../server/models/Cart');
const User = require('../server/models/User');
const Service = require('../server/models/Service');

module.exports = {
    create: async (req, res, next) => {
            const {user_id, service_id} = req.body;
        const newCart = new Cart(req.body);

        const user = await User.findById(user_id, 'first_name last_name email username phone address createdAt updatedAt');
        const service = await Service.findById(service_id);
        newCart.user = user;
        newCart.services = service;
        const result = await newCart.save();
        // console.log(service);
        res.json({status: 200, message: 'item inserted into cart success.', data: result});
    },
    index: async (req, res, next) => {
        const user_id = req.params.user_id || req.param('user_id');
        const cartItems = await Cart.find({user: user_id}).populate('services');
        res.json({status: 200, data: cartItems});
    },
    /*update: async (req, res, next) => {
        const {branch_id} = req.params;
        const newBranch = req.body;
        const result = await Branch.findByIdAndUpdate(branch_id, newBranch);
        res.json({status: 200, message: 'branch updated success.'});
    },*/
    view: async (req, res, next) => {

    },
    delete: async (req, res, next) => {
        const {cart_id} = req.params;
        const citem = await Cart.findByIdAndRemove(cart_id);
        res.json({status: 200, message: 'cart item deleted success.'});
    },

    empty_cart: async (req, res, next) => {
        const result = await Cart.remove({user: req.params.user_id});
        res.json({
            status: 200,
            message: 'all items removed successfully'
        });
    }

};


