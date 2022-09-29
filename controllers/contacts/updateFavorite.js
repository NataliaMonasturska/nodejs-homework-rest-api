const {Contact} = require("../../models/contacts");

const updateFavorite = async (req, res) => {
    const { contactId } = req.params;

    if (req.body.favorite === undefined) {
        const error = new Error("missing field favorite");
        error.status = 400;
        throw error;
    }
    const { favorite } = req.body;
    const result = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true });
    res.json({
        status: "success",
        code: 200,
        data: {
            result
        }
    })
}
module.exports = updateFavorite;
