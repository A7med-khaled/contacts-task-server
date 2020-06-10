var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const config = require('../../config');

var userSchema = mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },

    role: { type: String, default: 'user' },

    createdAt: { type: Date, required: true, default: Date.now },
    updateAt: { type: Date, required: true, default: Date.now },
});

// check Password Validation
userSchema.methods.isPasswordValid = async function(password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.signToken = function() {
    return jwt.sign({ _id: this._id, role: this.role, username: this.username }, config.JWTsecret, { expiresIn: `${config.TokenDurationInHours}h` });
};

userSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
});


module.exports = mongoose.model('User', userSchema);