const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderDetailsSchema = new Schema({
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'order'},
    /*category: { type: mongoose.Schema.Types.ObjectId, ref: 'category'},*/
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'service'},
    service_price: {type: String, require: true},
    /*employee: { type: mongoose.Schema.Types.ObjectId, ref: 'user'},*/
    /*branch: { type: mongoose.Schema.Types.ObjectId, ref: 'branch'},*/
    

}, {
    timestamp: true
});

module.exports = mongoose.model('orderdetail', orderDetailsSchema, 'order_details');