const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const { User } = require("../../models/user");
const gravatar = require('gravatar');
const {uid} = require("uid");
const {sendEmail} = require("../../helpers")
const {BASE_URL} = process.env;


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
    const mail ={
        to: email,
        subject: "website registration confirmation",
        html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Please click to complete registration.</a>`   
    }
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