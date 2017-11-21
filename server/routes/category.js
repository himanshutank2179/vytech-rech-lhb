const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const config = require('../../config');
const jsonwebtoken = require('jsonwebtoken');
const Category = require('../models/Category');

mongoose.Promise = global.Promise;

mongoose.connect(config.database, function (err) {
    if (err) {
        console.error(' Error in connect to db! ' + err);
    } else {
        console.log('connected to the database');
    }
});

/////////////////////////////////
////// ALL CATEGORY WS /////////////////
////////////////////////////////
router.get('/all-category', ['_id', 'name'], function (req, res) {
    Category.find({}, function (err, categories) {
        if (err) {
            res.send(err);
            return;
        }
        res.json(categories);
    });
});

/////////////////////////////////
////// ADD CATEGORY WS /////////////////
////////////////////////////////

//ADD CATEGORY WS
router.post('/add-category', function (req, res) {
    console.log('@add-category');
    var category = new Category();

    category.name = req.body.name;

    category.save(function (err, insertedCategory) {
        if (err) {
            console.log('Error in add category');
        } else {
            res.json({'status': 200, 'message': 'category inserted!'});
        }
    });
});

module.exports = router;