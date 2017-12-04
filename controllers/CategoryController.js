const Category = require('../server/models/Category');

module.exports = {
    create: async (req, res, next) => {
        const name = req.body;
        const newCategory = new Category(name);
        await newCategory.save();
        res.json({status: 200, message: 'category inserted success.'});
    },
    index: async (req, res, next) => {
        const categories = await Category.find({}, '_id name');
        res.json({status: 200, data: categories});
    },
    update: async (req, res, next) => {
        const {category_id} = req.params;
        const newCategory = req.body;
        const result = await Category.findByIdAndUpdate(category_id, newCategory);
        res.json({status: 200, message: 'category updated success.'});
    },
    view: async (req, res, next) => {
        const {category_id} = req.params;
        const category = await Category.findById(category_id, '_id name');
        res.json({status: 200, data: category});
    },
    delete: async (req, res, next) => {
        const {category_id} = req.params;
        const result = await Category.findByIdAndRemove(category_id);
        res.json({status: 200, message: 'category deleted success.'});
    }

};
