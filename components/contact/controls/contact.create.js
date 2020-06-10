const mongoose = require('mongoose');
const Contact = require('../contact.model');
const { addContact: addContactValidationSchema } = require('../contact.validation');

async function addNewContact(req, res, next) {
    try {
        const { error, value } = addContactValidationSchema.validate(req.body, { stripUnknown: true });
        if (error) return res.status(400).json({ message: error.message.replace(/"/g, '') });
        console.log(req.userData)

        const checkExist = await Contact.findOne({ phone: value.phone })
        if (checkExist) return res.status(400).json({ message: 'this phone is already exsist' });

        value.createdBy = req.userData._id;

        const newContact = await Contact.create(value);

        return res.status(200).json({ Contact });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = addNewContact;