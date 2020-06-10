const jwt = require('jsonwebtoken');
const Config = require('../config')

function isRoleAllowed(req, allowedRoles) {
    const allowed = allowedRoles.find(e => e === req.userData.role);
    return !!(allowed);
}

module.exports = {
    auth(allowedRoles) {
        return function(req, res, next) {
            try {
                req.userData = jwt.verify(req.headers.authorization, Config.JWTsecret);

                if (!isRoleAllowed(req, allowedRoles)) throw new Error();

                next();

            } catch (error) {
                return res.status(401).json({ message: 'Session Expired' });
            }
        };
    },


};