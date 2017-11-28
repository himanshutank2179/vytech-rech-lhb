const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderTimeSchema = new Schema({
    order_id: {type: String, require: true},
    service_time: {type: String, require: true},
}, {
    timestamp: true
});

module.exports = mongoose.model('ordertime', orderTimeSchema, 'order_times');
