const { login: loginValidationSchema } = require("../user.validation");
const User = require("../user.model");
const jwt = require("jsonwebtoken");
const config = require("../../../config");

// const users = [{
//         _id: "111111111111",
//         username: "user1",
//         password: "user1",
//         role: "user",
//     },
//     {
//         _id: "222222222222",
//         username: "user2",
//         password: "user2",
//         role: "user",
//     },
// ];

async function access(req, res, next) {
    try {
        const { error, value } = loginValidationSchema.validate(req.body);
        if (error)
            return res.status(400).json({ message: error.message.replace(/"/g, "") });

        const user = await User.findOne({ username: value.username });
        if (!user)
            return res.status(400).json({ message: "Invalid username or password" });

        const isPasswordValid = await user.isPasswordValid(value.password);
        if (!isPasswordValid)
            return res.status(400).json({ message: "Invalid username or password" });

        let Token = user.signToken();

        // const found = users.find(
        //     (element) =>
        //     element.username == value.username && element.username == value.username
        // );

        // if (!found)
        //     return res.status(400).json({ message: "Invalid username or password" });

        // delete found.password;
        // const Token = jwt.sign(found, config.JWTsecret, {
        //     expiresIn: `${config.TokenDurationInHours}h`,
        // });

        return res.status(200).json({
            Token,
            userData: {
                _id: user._id,
                username: user.username,
            },
            // userData: found,
        });
    } catch (err) {
        // should log error details here
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = access;