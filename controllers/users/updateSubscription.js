const { User } = require("../../models/user");


const updateSubscription = async (req, res) => {
    const { _id } = req.user;
    const { subscription } = req.body;
    const result = await User.findByIdAndUpdate(_id, { subscription }, { new: true });
    res.json({
        status: "success",
        code: 200,
        data: {
            _id: result._id,
            email: result.email,
            subscription: result.subscription
        }
    })
}

module.exports = updateSubscription;