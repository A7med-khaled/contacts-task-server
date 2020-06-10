const mongoose = require('mongoose');
const Contact = require('../contact.model');
const { pagination: paginationValidationSchema } = require('../contact.validation');

async function getContent(req, res, next) {
    try {
        const { error, value } = paginationValidationSchema.validate(req.query, { stripUnknown: true });
        if (error) return res.status(400).send({ message: error.message.replace(/"/g, '') });

        const queryLimitNo = Number.parseInt(value.limitNo);
        const querySkipNo = Number.parseInt(value.pageNo) * queryLimitNo;

        const contactCount = await Contact.find({}).countDocuments();
        const contact = await Contact.find({}, '-createdAt -updateAt -createdBy -__v')
            .skip(querySkipNo)
            .limit(queryLimitNo);

        return res.status(200).json({ contact, contactCount });


    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = getContent;