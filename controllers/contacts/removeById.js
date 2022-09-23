const contactsOperations = require("../../models/contacts");

const removeById = async (req, res) => {
    const { contactId } = req.params;
    const contact = await contactsOperations.removeContact(contactId);
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