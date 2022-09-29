const { isValidObjectId } = require("mongoose");

const isValidId = (req, res, next) => {
    const { contactId } = req.params;
    const result = isValidObjectId(contactId);
    if (!result) {
        const error = new Error(`${contactId} is not valid id`);
        error.status = 404;
        throw error;
    }
    next()
}

module.exports = isValidId; 