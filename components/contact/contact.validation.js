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

const paginationSchema = {
    pageNo: joi.string()
        .required()
        .trim()
        .pattern(/^[0-9]*$/)
        .message('Enter a valid number'),
    limitNo: joi.string()
        .required()
        .trim()
        .pattern(/^[0-9]*$/)
        .message('Enter a valid number')
};

module.exports = {
    addContact: joi.object(contactSchema),
    editContact: joi.object(contactSchema),
    pagination: joi.object(paginationSchema)
}