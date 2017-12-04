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
        newCart.services.push(service);
        const result = await newCart.save();
        // console.log(service);
        res.json({status: 200, message: 'item inserted into cart success.', data: result});
    },
    /*index: async (req, res, next) => {
        const branches = await Branch.find();
        res.json({status: 200, data: branches});
    },
    update: async (req, res, next) => {
        const {branch_id} = req.params;
        const newBranch = req.body;
        const result = await Branch.findByIdAndUpdate(branch_id, newBranch);
        res.json({status: 200, message: 'branch updated success.'});
    },*/
    view: async (req, res, next) => {
        const user_id = req.params.user_id || req.param('user_id');
        const cartItems = await Cart.find({user: user_id}).populate('services');
        res.json({status: 200, data: cartItems});
    },
    /*delete: async (req, res, next) => {
        const {branch_id} = req.params;
        const result = await Branch.findByIdAndRemove(branch_id);
        res.json({status: 200, message: 'branch deleted success.'});
    }*/
    empty_cart: async (req, res, next) =>{
        const result = await Cart.remove({user_id: req.params.user_id});
        res.json({
            status: 200,
            message: 'all items removed successfully'
        });
    }

};


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