const {Contact} = require("../../models/contacts");
const mongoose = require('mongoose');

const removeById = async (req, res) => {
    const { contactId } = req.params;
    if (!mongoose.isValidObjectId(contactId)) {
        const error = new Error(`Product with id=${contactId} not found`);
        error.status = 404;
        throw error;
    }
    const contact = await Contact.findByIdAndRemove(contactId);
    if (!contact) {
        const error = new Error(`Product with id=${contactId} not found`);
        error.status = 404;
        throw error;
    }
    res.json({
        status: "success",
        code: 200,
        message: "contact deleted",
        data: {
            contact
        }
    })
}
module.exports = removeById;