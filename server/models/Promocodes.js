const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const promocodeSchema = new Schema({
    code: {type: String, required: true},
    service_id: {type: String, require: true},
    discount: {type: String, required: true},
    discount_type: {type: String, required: true},
    image: {type: String, required: true},
}, {
    timestamp: true
});

module.exports = mongoose.model('promocode', promocodeSchema, 'promocodes');
