const { Contact } = require("../../models/contacts");
const { Forbidden } = require("http-errors");

const updateById = async (req, res) => {
    const { _id } = req.user;
    const { contactId } = req.params;
    const contact = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
    if (!contact) {
        const error = new Error(`Product with id=${contactId} not found`);
        error.status = 404;
        throw error;
    }
    if (String(_id) !== String(contact.owner)) {
        throw new Forbidden("Access is denied");
    }
    res.json({
        status: "success",
        code: 200,
        data: {
            contact
        }
    })
}
module.exports = updateById;

















