const mongoose = require('mongoose');
const Contact = require('../contact.model');
const { addContact: addContactValidationSchema } = require('../contact.validation');

async function editContact(req, res, next) {
    try {
        const { contactId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(contactId)) return res.status(400).json({ message: 'Invalid contact' });

        const { error, value } = addContactValidationSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.message.replace(/"/g, '') });
        value.editBy = req.userData.id;

        const editedContact = await Place.findOneAndUpdate({ _id: contactId }, value, { new: true });

        return res.status(200).json({ editedContact });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = editContact;