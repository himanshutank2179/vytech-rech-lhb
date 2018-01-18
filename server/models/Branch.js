const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const branchSchema = new Schema({
        name: {type: String, require: true},
        address: {type: String, require: true},
        phone: {type: String, require: true},
        pincode: {type: String, require: true},

    },
    {
        timestamp: true
    });


module.exports = mongoose.model('branch', branchSchema, 'branches');