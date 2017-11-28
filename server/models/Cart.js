const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    code: {type: String, required: true},
    service_id: {type: String, require: true},
    user_id: {type: String, require: true},
    price: {type: Number, required: true},
}, {
    timestamp: true
});

module.exports = mongoose.model('cart', cartSchema, 'cart');
