const express = require('express');
/*const router = express.Router();*/
const router = require('express-promise-router')();
//Importing controllers
const CategoryController = require('../../controllers/CategoryController');


/////////////////////////////////
////// ALL CATEGORY WS /////////////////
////////////////////////////////
/*
router.get('/all-category', function (req, res) {
    Category.find({}, '_id name',function (err, categories) {
        if (err) {
            res.send(err);
            return;
        }
        res.json(categories);
    });
});
*/

/////////////////////////////////
////// ADD CATEGORY WS /////////////////
////////////////////////////////

//ADD CATEGORY WS
/*
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
*/

router.route('/category/create').post(CategoryController.create);

router.route('/category').get(CategoryController.index) // will get all category

router.route('/category/:category_id')
    .get(CategoryController.view) // will get single category obj based on id
    .patch(CategoryController.update) // will update that particular record/document based on id
    .delete(CategoryController.delete); // will delete that perticular record/document based on id





















module.exports = router;