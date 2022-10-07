const { Contact } = require("../../models/contacts");
const { Forbidden } = require("http-errors");

const getById = async (req, res) => {
    const { _id } = req.user;
    const { contactId } = req.params;

    const contact = await Contact.findById(contactId);

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
module.exports = getById;