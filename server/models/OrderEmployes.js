const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderEmpSchema = new Schema({
    order_id: {type: String, require: true},
    employee_id: {type: String, require: true},
}, {
    timestamp: true
});

module.exports = mongoose.model('orderemployee', orderEmpSchema, 'order_employes');
