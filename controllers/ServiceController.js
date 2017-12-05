const Service = require('../server/models/Service');
const Branch = require('../server/models/Branch');
const Category = require('../server/models/Category');

module.exports = {
    // parameter{name, image, price,interval_time,duration,branch_id,category_id}
    create: async (req, res, next) => {
        const branchId = req.body.branch_id;
        const categoryId = req.body.category_id;
        const newService = new Service(req.body);
        const branch = await Branch.findById({_id: branchId});
        const category = await Category.findById({_id: categoryId});
        newService.branch = branch;
        newService.category = category;
        await newService.save();
        res.json({status: 200, message: 'service inserted success.'});
    },
    index: async (req, res, next) => {
        const services = await Service.find().populate('branch category');
        res.json({status: 200, data: services});
    },
    update: async (req, res, next) => {
        const {service_id} = req.params;
        const newService = req.body;
        const result = await Service.findByIdAndUpdate(service_id, newService);
        res.json({status: 200, message: 'service updated success.'});
    },
    view: async (req, res, next) => {
        const {service_id} = req.params;
        const service = await Service.findById(service_id).populate('branch category');
        res.json({status: 200, data: service});
    },
    delete: async (req, res, next) => {
        const {service_id} = req.params;
        const result = await Service.findByIdAndRemove(service_id);
        res.json({status: 200, message: 'service deleted success.'});
    },
    //parameter {category_id}
    getServiceByCategory: async (req, res, next) => {
        const category_id = req.params.category;
        const service = await Service.find({category:category_id});
        //res.json({status: 200, data: service,cat:category_id});
    },

};