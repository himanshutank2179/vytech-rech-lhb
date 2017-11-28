const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    order_id: {type: String, require: true},
    user_id: {type: String, require: true},
    status: {type: Number, default: 1}, // 1 = pending, 2 = order placed
}, {
    timestamp: true
});

module.exports = mongoose.model('order', orderSchema, 'orders');
