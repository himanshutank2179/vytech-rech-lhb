const Order = require('../server/models/Order');
const OrderDetails = require('../server/models/OrderDetails');
const User = require('../server/models/User');
const Branch = require('../server/models/Branch');
const Category = require('../server/models/Category');
const Service = require('../server/models/Service');
const Cart = require('../server/models/Cart');


module.exports = {

    create: async (req, res, next) => {
        const user_id = req.params.user_id;


        var newOrder = Order(req.body);
        newOrder.user = user_id;
        const result = await newOrder.save();
        console.log('order save result', result);
        var cartItems = await Cart.find({user: user_id});

        cartItems.forEach(async (item) => {            
            var order = await Order.findById(result._id);
            console.log('order', order);
            const service = await Service.findById(item.services);
            var newOrderDetails = new OrderDetails();
            newOrderDetails.service = service;
            newOrderDetails.service_price = item.price;
            newOrderDetails.order = result;
            var od = await newOrderDetails.save();
            order.orderdetail.push(od);
            await order.save();
            await Cart.remove({user: user_id});

        });

        res.json({status: 200, order:result,services: cartItems});

    },
    index: async (req, res, next) => {

    },
    update: async (req, res, next) => {

    },
    view: async (req, res, next) => {

    },
    delete: async (req, res, next) => {

    },

};


/*router.post('/checkout', function (req, res) {
    var user_id = req.body.user_id;
    var order_detail = req.body.order_detail;

    var order = new Order();
    order.user_id = user_id;
    order.status = 1;
    order.save(function (err, insertedOrder) {
        if (err) {
            console.log('Error in add service' + err);
        } else {
            order_detail.forEach(function (orderDetail, index, arr) {
                // res.json(orderDetail);
                var od = new OrderDetails();
                od.order_id = insertedOrder.order_id;
                od.branch_id = orderDetail['branch_id'];
                od.category_id = orderDetail['category_id'];
                od.service_id = orderDetail['service_id'];
                od.employee_id = orderDetail['employee_id'];
                od.service_price = orderDetail['service_price'];
                od.service_time = orderDetail['service_time'];
                od.save(function (err, insertedOd) {
                    if (err) {
                        res.json({'status': 500, 'message': 'error in storing order details.'});
                    }
                });
            });
            res.json({'status': 200, 'message': 'Order inserted successfully!'});
        }
    });
});*/











































