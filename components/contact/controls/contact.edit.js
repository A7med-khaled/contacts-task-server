const mongoose = require('mongoose');
const Contact = require('../contact.model');
const { addContact: addContactValidationSchema } = require('../contact.validation');

async function editContact(req, res, next) {
    try {
        const { contactId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(contactId)) return res.status(400).json({ message: 'Invalid contact' });

        const { error, value } = addContactValidationSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.message.replace(/"/g, '') });

        const checkExist = await Contact.findOne({ phone: value.phone })
        if (checkExist && checkExist.id !== contactId) return res.status(400).json({ message: 'this phone is already exsist' });

        value.editBy = req.userData._id;

        const editedContact = await Contact.findOneAndUpdate({ _id: contactId }, value, { new: true });
        if (!editedContact) return res.status(400).json({ message: 'Invalid contact' })


        return res.status(200).json({ editedContact });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = editContact;