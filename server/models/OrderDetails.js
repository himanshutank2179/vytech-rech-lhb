const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderDetailsSchema = new Schema({
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'order'},
    branch: { type: mongoose.Schema.Types.ObjectId, ref: 'branch'},
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'category'},
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'service'},
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    service_price: {type: String, require: true},

}, {
    timestamp: true
});

module.exports = mongoose.model('orderdetail', orderDetailsSchema, 'order_details');