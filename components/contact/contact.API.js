const express = require('express');
const router = express.Router();

const Security = require('../../security');

const createNew = require('./controls/contact.create')
const editContact = require('./controls/contact.edit')
const getAll = require('./controls/contact.get')
const deleteContact = require('./controls/contact.delete')

router.post('/contact/create', Security.auth(['user']), createNew);
router.put('/contact/edit/:contactId', Security.auth(['user']), editContact);
router.get('/contact/get', Security.auth(['user']), getAll);
router.delete('/contact/delete/:contactId', Security.auth(['user']), deleteContact);


module.exports = router;