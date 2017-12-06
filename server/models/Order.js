const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    employee: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    branch: {type: mongoose.Schema.Types.ObjectId, ref: 'branch'},
    total: {type: Number},
    coupon_less_amt: {type: Number},
    cgst: {type: Number},
    sgst: {type: Number},
    status: {type: Number, default: 1}, // 1 = pending, 2 = order placed
    appointment_time: {type: Date},
    texable_amount: {type: Number},
}, {
    timestamp: true
});

module.exports = mongoose.model('order', orderSchema, 'orders');
