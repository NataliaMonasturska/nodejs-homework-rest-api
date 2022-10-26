const { Unauthorized } = require("http-errors");
const { User } = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
    if (!user) {
        throw new Unauthorized(`Email ${email} not found`);
    }
    if (!user.verify) {
        throw new Unauthorized(`Email ${email} not ferify`);
    }
    const passCompare = await bcrypt.compare(password, user.password);

    if (!passCompare) {
        throw new Unauthorized("Password wrong");
    }
    const payload = {
        id: user._id
    }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "3h" });
    await User.findByIdAndUpdate(user._id, { token });
    res.json({
        status: "success",
        code: 200,
        data: {
            token,
            user: {
                email,
                subscription: user.subscription
            }
        }
    })
}

module.exports = login;