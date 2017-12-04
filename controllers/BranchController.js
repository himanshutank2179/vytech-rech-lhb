const Branch = require('../server/models/Branch');

module.exports = {
    create: async (req, res, next) => {
        const name = req.body;
        const newBranch = new Branch(name);
        await newBranch.save();
        res.json({status: 200, message: 'branch inserted success.'});
    },
    index: async (req, res, next) => {
        const branches = await Branch.find();
        res.json({status: 200, data: branches});
    },
    update: async (req, res, next) => {
        const {branch_id} = req.params;
        const newBranch = req.body;
        const result = await Branch.findByIdAndUpdate(branch_id, newBranch);
        res.json({status: 200, message: 'branch updated success.'});
    },
    view: async (req, res, next) => {
        const {branch_id} = req.params;
        const branch = await Branch.findById(branch_id);
        res.json({status: 200, data: branch});
    },
    delete: async (req, res, next) => {
        const {branch_id} = req.params;
        const result = await Branch.findByIdAndRemove(branch_id);
        res.json({status: 200, message: 'branch deleted success.'});
    }

};


