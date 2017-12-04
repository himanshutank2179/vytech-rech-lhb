const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    //service_id: {type: String, require: true},
    //user_id: {type: String, require: true},
    price: {type: Number, required: true},
    services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service'}],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
}, {
    timestamp: true
});

module.exports = mongoose.model('cart', cartSchema, 'cart');
