const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderDetailsSchema = new Schema({
    order_id: {type: String, require: true},
    branch_id: {type: String, require: true},
    category_id: {type: String, require: true},
    service_id: {type: String, require: true},
    employee_id: {type: String, require: true},
    service_price: {type: String, require: true},
    service_time: {type: String, require: true}
}, {
    timestamp: true
});

module.exports = mongoose.model('orderdetail', orderDetailsSchema, 'order_details');