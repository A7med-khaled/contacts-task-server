var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Contact = mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    notes: { type: String, required: true },

    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    editBy: { type: Schema.Types.ObjectId, ref: 'User' },

    createdAt: { type: Date, required: true, default: Date.now },
    updateAt: { type: Date, required: true, default: Date.now },
});


Contact.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
});

module.exports = mongoose.model('Contact', Contact);