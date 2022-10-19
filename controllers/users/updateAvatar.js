const { User } = require("../../models/user");
const path = require("path");
const fs = require("fs/promises");
const jimp = require("jimp");
const { BadRequest } = require("http-errors");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {

    if (req.file === undefined) {
        throw new BadRequest("\"avatar\" is required");
    }
    const { path: tempUpload, originalname } = req.file;
    console.log(req.file.type);
    const { _id: id } = req.user;
    const imageName = `${id}_${originalname}`;
    try {
        const resultUpload = path.join(avatarsDir, imageName);
        const img = await jimp.read(tempUpload);
        await img.autocrop().cover(250, 250, jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_MIDDLE).writeAsync(tempUpload);
        await fs.rename(tempUpload, resultUpload);
        const avatarURL = path.join("public", "avatars", imageName);
        await User.findByIdAndUpdate(req.user._id, { avatarURL });
        res.json({ avatarURL })
    } catch (error) {
        console.log(error.message);
        await fs.unlink(tempUpload);
        if (error.message === 'Unsupported MIME type: audio/mpeg') {
            error.status = 400;
        }
        throw error; 
    }
}

module.exports = updateAvatar;