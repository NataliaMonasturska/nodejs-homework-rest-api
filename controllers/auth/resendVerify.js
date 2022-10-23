const { User } = require("../../models/user");
const { BadRequest } = require("http-errors");

const { createVerifyEmail, sendEmail } = require("../../helpers")

const resendVerify = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw new BadRequest(`Email not found`)
    }
    if (user.verificationToken === null) {
        res.status(400).json({
            message: "Verification has already been passed"
        })
        return
    }
    const mail = createVerifyEmail(email, user.verificationToken);

    await sendEmail(mail);

    res.json({
        message: "Verification email sent"
    })

}

module.exports = resendVerify;