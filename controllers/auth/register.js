const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const { User } = require("../../models/user");
const gravatar = require('gravatar');
const { uid } = require("uid");
const { sendEmail, createVerifyEmail } = require("../../helpers")




const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw new Conflict(`User with ${email} already exist`)
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);

    const verificationToken = uid(32);
    await User.create({ email, password: hashPassword, avatarURL, verificationToken });
    const mail = createVerifyEmail(email, verificationToken);

    await sendEmail(mail);
    res.status(201).json({
        status: "success",
        code: 201,
        data: {
            user: {
                email,
                subscription: "starter",
                avatarURL,
            }
        }
    })
};

module.exports = register;