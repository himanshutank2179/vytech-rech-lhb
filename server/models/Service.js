const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
    name: {type: String, required: true},
    image: {type: String, required: true},
    price: {type: Number, required: true},
    duration: {type: Number, required: true},
    interval_time: {type: Number, required: true},
    //branch_id: {type: String, require: true},
    //category_id: {type: String, require: true}
    branch: {type: Schema.Types.ObjectId, ref: 'branch'},
    category: {type: Schema.Types.ObjectId, ref: 'category'},
}, {
    timestamp: true
});

module.exports = mongoose.model('service', serviceSchema, 'services');
