const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderBranchesSchema = new Schema({
    order_id: {type: String, require: true},
    branch_id: {type: String, require: true},
}, {
    timestamp: true
});

module.exports = mongoose.model('orderbranches', orderBranchesSchema, 'order_branches');
