const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    status: {type: Number, default: 1}, // 1 = pending, 2 = order placed
}, {
    timestamp: true
});

module.exports = mongoose.model('order', orderSchema, 'orders');
