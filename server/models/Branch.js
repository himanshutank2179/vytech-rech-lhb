const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const branchSchema = new Schema({
        name: {type: String, require: true}
    },
    {
        timestamp: true
    });

module.exports = mongoose.model('branch', branchSchema, 'branches');