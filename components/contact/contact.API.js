const express = require('express');
const router = express.Router();

const Security = require('../../security');

const createNew = require('./controls/contact.create')

router.post('/contact/create', Security.auth(['user']), createNew);
router.post('/contact/edit/:contactId', Security.auth(['user']), createNew);


module.exports = router;