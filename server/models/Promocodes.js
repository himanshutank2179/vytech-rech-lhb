const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const promocodeSchema = new Schema({
    code: {type: String},
    services: [{type: mongoose.Schema.Types.ObjectId, ref: 'service'}],
    discount: {type: String},
    discount_type: {type: String},
    image: {type: String},
    code_start: {Type: Date},
    code_end: {Type: Date}
}, {
    timestamp: true
});

module.exports = mongoose.model('promocode', promocodeSchema, 'promocodes');
