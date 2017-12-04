const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    //service_id: {type: String, require: true},
    //user_id: {type: String, require: true},
    price: {type: Number, required: true},
    services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'service'}],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user'},
}, {
    timestamp: true
});

module.exports = mongoose.model('cart', cartSchema, 'cart');
