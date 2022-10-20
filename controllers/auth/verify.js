const { User } = require("../../models/user");
const {NotFound} = require("http-errors");

const verify = async(req, res)=> {
    const {verificationToken} = req.params;
    const user = await User.findOne({verificationToken});
    if(!user){
        NotFound("User not found")
    }
 await User.findByIdAndUpdate(user._id, {verify: true, verificationToken: null})
 res.status(200).json({
    message: 'Verification successful'
 })
}

module.exports = verify;