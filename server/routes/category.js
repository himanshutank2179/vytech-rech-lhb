const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const config = require('../../config');
const jsonwebtoken = require('jsonwebtoken');
const Category = require('../models/Category');

mongoose.Promise = global.Promise;

mongoose.connect(config.database,function (err) {
    if (err) {
        console.error(' Error in connect to db! ' + err);
    } else {
        console.log('connected to the database');
    }
});


router.get('/all-category', function (req, res) {
    Category.find({}, function (err, categories) {
        if (err) {
            res.send(err);
            return;
        }
        res.json(categories);
    });
});

module.exports = router;