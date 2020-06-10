const express = require('express');

const router = express.Router();
const login = require('./controls/user.access')

router.post('/user/login', login);


module.exports = router;