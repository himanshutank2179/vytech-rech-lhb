const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const Schema = mongoose.Schema;

const userSchema = new Schema({
        first_name: String,
        last_name: String,
        email: String,
        username: String,
        password: String,
        phone: String,
        address: String,
        user_type: {type: Number}, /* 1 = super admin, 2 = admin, 3 = emp, 4 = user   */
        //branch_id: {type: String, require: true}
        branch: {type: Schema.Types.ObjectId, ref: 'branch'},
        promocodes:[{type: mongoose.Schema.Types.ObjectId, ref: 'promocode'}]

    },
    {
        timestamps: true
    });

userSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password')) return next();

    bcrypt.hash(user.password, null, null, function (err, hash) {
        if (err) return next();

        user.password = hash;
        next();
    });
});

//Creating Method for check password is match or not
userSchema.methods.comparePassword = function (password) {
    var user = this;
    return bcrypt.compareSync(password, user.password);
}

module.exports = mongoose.model('user', userSchema, 'users');