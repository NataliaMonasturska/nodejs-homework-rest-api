const { Contact } = require("../../models/contacts");

const getAll = async (req, res) => {
    const { _id } = req.user;
    const { page = 1, limit = 5, favorite } = req.query;
    const skip = (page - 1) * limit;
    let contacts = [];
    if (favorite === undefined) {
        contacts = await Contact.find({ owner: _id }, "-createdAt -updateAt", { skip, limit: Number(limit) }).populate("owner", "_id email subscription");
    }
    if (favorite === "true" || favorite === "false") {
        contacts = await Contact.find({ owner: _id, favorite }, "-createdAt -updateAt", { skip, limit: Number(limit) }).populate("owner", "_id email subscription");

    }

    res.json({
        status: "success",
        code: 200,
        data: {
            result: contacts
        }
    })
}

module.exports = getAll;