const { Contact } = require("../../models/contacts");
const { Forbidden } = require("http-errors");

const updateFavorite = async (req, res) => {
    const { _id } = req.user;
    const { contactId } = req.params;
    const { favorite } = req.body;
    const result = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true });
    if (!result) {
        const error = new Error(`Product with id=${contactId} not found`);
        error.status = 404;
        throw error;
    }
    if (String(_id) !== String(result.owner)) {
        throw new Forbidden("Access is denied");
    }
    res.json({
        status: "success",
        code: 200,
        data: {
            result
        }
    })
}
module.exports = updateFavorite;
