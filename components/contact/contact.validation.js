const joi = require('@hapi/joi');


const contactSchema = {
    name: joi.string()
        .required()
        .trim()
        .message('Enter a valid name'),
    phone: joi.string()
        .required()
        .trim()
        .message('Enter a valid phone'),
    address: joi.string()
        .required()
        .trim()
        .message('Enter a valid address'),
    notes: joi.string()
        .required()
        .trim()
        .message('Enter a valid notes'),
};



module.exports = {
    addContact: joi.object(contactSchema),
    editContact: joi.object(contactSchema)
}