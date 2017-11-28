const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    order_id: {type: String, require: true},
    user_id: {type: String, require: true},
}, {
    timestamp: true
});

module.exports = mongoose.model('order', orderSchema, 'orders');
