const { login: loginValidationSchema } = require('../user.validation');
const User = require('../user.model');


async function access(req, res, next) {

    try {
        const { error, value } = loginValidationSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.message.replace(/"/g, '') });

        const user = await User.findOne({ username: value.username });
        if (!user) return res.status(400).json({ message: 'Invalid username or password' });


        const isPasswordValid = await user.isPasswordValid(value.password);
        if (!isPasswordValid) return res.status(400).json({ message: 'Invalid username or password' });

        let Token = user.signToken();

        return res.status(200).json({
            Token,
            userData: {
                _id: user._id,
                username: user.username,
            }
        });
    } catch (err) {
        // should log error details here 
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = access;