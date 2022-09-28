const Contact = require("../../models/contacts");
const mongoose = require('mongoose');

const updateFavorite = async (req, res) => {
    const { contactId } = req.params;
    if(!mongoose.isValidObjectId(contactId)){
        const error = new Error(`Product with id=${contactId} not found`);
        error.status = 404;
        throw error;
    }
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
