const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    price: {type: Number, required: true},
    services: { type: mongoose.Schema.Types.ObjectId, ref: 'service'},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user'},
}, {
    timestamp: true
});

module.exports = mongoose.model('cart', cartSchema, 'cart');
