const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderCategorySchema = new Schema({
    order_id: {type: String, require: true},
    category_id: {type: String, require: true},
}, {
    timestamp: true
});

module.exports = mongoose.model('ordercategory', orderCategorySchema, 'order_categories');
