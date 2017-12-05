const Order = require('../server/models/Order');
const OrderDetails = require('../server/models/OrderDetails');
const User = require('../server/models/User');
const Branch = require('../server/models/Branch');
const Category = require('../server/models/Category');
const Service = require('../server/models/Service');


module.exports = {

    create: async (req, res, next) => {
        const user_id = req.params.user_id;
        const order_detail = req.body.order_detail;

        /*storing order*/

        var newOrder = new Order();
        newOrder.status = 1;
        /*get user info from db*/
        const user = await User.findById(user_id);
        newOrder.user = user;
        var result = await newOrder.save();
        if (result) {
            order_detail.forEach(async (orderDetail, index, arr) => {


                /*get branch*/
                const branch = await Branch.findById(orderDetail['branch_id']);
                console.log(branch);

                /*get category*/
                const category = await Category.findById(orderDetail['category_id']);
                console.log(category);

                /*get service*/
                const service = await Service.findById(orderDetail['service_id']);
                console.log(service);

                /*get employee*/
                const emp = await User.findById(orderDetail['employee_id']);
                console(emp);

                /*get obj of Order OrderDetails*/
                var od = new OrderDetails();
                od.branch = branch;
                od.category = category;
                od.service = service;
                od.employee = emp;
                od.service_price = orderDetail['service_price'];
                od.service_time = orderDetail['service_time'];
                const res = await od.save();

            });
        }

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











































