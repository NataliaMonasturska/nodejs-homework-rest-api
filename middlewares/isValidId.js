const { isValidObjectId } = require("mongoose");
const { reqError } = require("../helpers")

const isValidId = (req, res, next) => {
    const { contactId } = req.params;
    const result = isValidObjectId(contactId);
    if (!result) {
        next(reqError(404, `${contactId} is not valid id`))
    }
    next()
}


module.exports = isValidId; 