const Promocodes = require('../server/models/Promocode');
const User = require('../server/models/User');

module.exports = {

    create: async (req, res, next) => {
        const users = req.body.users;
        const promo = new Promocodes(req.body);
        const result = await promo.save();
        if (users) {
            users.forEach(async (user) => {                
                var usr = await User.findById(user);
                const code = await Promocodes.findById(result._id);              
                usr.promocodes.push(code);
                const puser = await usr.save();               
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
        const {promocode_id} = req.params;
        const codes = await Promocodes.findById(promocode_id);
        res.json({status: 200, data: codes});
    },
    delete: async (req, res, next) => {

    },
    getUserPromocode: async (req, res, next) => {
        const user_id = req.params.user_id;
        /*const user = await User.findById(user_id).populate('promocodes');*/
        const user = await User.findById(user_id).populate({ 
     path: 'promocodes',
     populate: {
       path: 'services'       
     } 
  });
        res.json({status: 200, data: user.promocodes});

    }
}