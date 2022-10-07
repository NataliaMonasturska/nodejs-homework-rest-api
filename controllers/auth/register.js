const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const { User } = require("../../models/user");


const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw new Conflict(`User with ${email} already exist`)
    }
    const hashPassword = await bcrypt.hash(password, 10);
    await User.create({ email, password: hashPassword });
    res.status(201).json({
        status: "success",
        code: 201,
        data: {
            user: {
                email,
                subscription: "starter",
            }
        }
    })
};

module.exports = register;