const joi = require('@hapi/joi');



const loginSchema = {
    username: joi.string().required(),
    password: joi.string().required()
};


module.exports = {
    login: joi.object(loginSchema),
}