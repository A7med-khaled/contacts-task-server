const mongoose = require('mongoose');
const Contact = require('../contact.model');

async function deleteContact(req, res, next) {
    try {
        const { contactId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(contactId)) return res.status(400).json({ message: 'Invalid contact' });

        const deleted = await Contact.deleteOne({ _id: contactId });
        if (deleted.deletedCount == 0) return res.status(400).json({ message: 'Invalid contact' })

        return res.status(200).json({ message: 'contact deleted successfully', deleted });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = deleteContact;