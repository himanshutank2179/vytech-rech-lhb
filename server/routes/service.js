const express = require('express');
const mongoose = require('mongoose');
const config = require('../../config');
const Service = require('../models/Service');
const router = express.Router();
const jsonwebtoken = require('jsonwebtoken');


/////////////////////////////////
////// SERVICES BY branch_id AND category_id ///
////////////////////////////////
router.post('/all-services', function (req, res) {
    Category.find({name:req.params.name}, '_id name',function (err, categories) {
        if (err) {
            res.send(err);
            return;
        }
        res.json(categories);
    });
});

/////////////////////////////////
////// ADD SERVICE WS /////////////////
////////////////////////////////

//ADD SERVICE WS
router.post('/add-service', function (req, res) {
    console.log('@add-service');
    var service = new Service();

    service.name = req.body.name;

    service.save(function (err, insertedService) {
        if (err) {
            console.log('Error in add service');
        } else {
            res.json({'status': 200, 'message': 'service inserted!'});
        }
    });
});



module.exports = router;