const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderServiceSchema = new Schema({
    order_id: {type: String, require: true},
    service_id: {type: String, require: true},
}, {
    timestamp: true
});

module.exports = mongoose.model('orderservice', orderServiceSchema, 'order_services');
