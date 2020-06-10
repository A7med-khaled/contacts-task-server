const mongoose = require('mongoose');
const Contact = require('../');
const { addContact: addContactValidationSchema } = require('../contact.validation');

async function addNewContact(req, res, next) {
    try {
        const { error, value } = addContactValidationSchema.validate(req.body, { stripUnknown: true });
        if (error) return res.status(400).json({ message: error.message.replace(/"/g, '') });

        value.createdBy = req.userData.id

        const newContact = await Contact.create(value);

        return res.status(200).json({ newContact });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = addNewContact;