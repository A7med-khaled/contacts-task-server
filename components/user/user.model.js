var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = mongoose.Schema({
    username:   { type: String, required: true },
    password:   { type: String, required: true },

    createdAt:  { type: Date, required: true, default: Date.now },
    updateAt:   { type: Date, required: true, default: Date.now },
});


User.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

module.exports = mongoose.model('User', User);
