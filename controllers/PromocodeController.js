const Promocodes = require('../server/models/Promocode');
const User = require('../server/models/User');

module.exports = {

    create: async (req, res, next) => {
        const users = req.body.users;
        const promo = new Promocodes(req.body);
        const result = await promo.save();
        if (users) {
            users.forEach(async (user) => {
                console.log('user id is', user);
                var usr = await User.findById(user);
                const code = await Promocodes.findById(result._id);
                console.log('code is', code);
                console.log(usr);
                usr.promocodes.push(code);
                const puser = await usr.save();
                console.log('promocode saved to the user', puser);
            });
        }


        res.json({status: 200, message: 'promocode inserted success.', data: result});
    },
    index: async (req, res, next) => {
        const promos = await Promocodes.find().populate('services');
        res.json({status: 200, data: promos});
    },
    update: async (req, res, next) => {

    },
    view: async (req, res, next) => {

    },
    delete: async (req, res, next) => {

    },
    getUserPromocode: async (req, res, next) => {
        const user_id = req.params.user_id;
        const user = await User.findById(user_id).populate('promocodes');
        res.json({status: 200, data: user.promocodes});

    }
}