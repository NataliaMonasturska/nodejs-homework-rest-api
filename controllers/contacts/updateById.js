const contactsOperations = require("../../models/contacts");

const updateById = async (req, res) => {
    const { contactId } = req.params
    const contact = await contactsOperations.updateContact(contactId, req.body);
    if (!contact) {
        const error = new Error(`Product with id=${contactId} not found`);
        error.status = 404;
        throw error;
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

















