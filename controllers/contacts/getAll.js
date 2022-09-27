// const contactsOperations = require("../../models/contacts");
const Contact = require("../../models");
console.log("Contact in is there", Contact);
const getAll = async (req, res) => {
    console.log("getAll");
    const contacts = await Contact.find({});
    console.log(contacts);
    res.json({
        status: "success",
        code: 200,
        data: {
            result: contacts
        }
    })
}

module.exports = getAll;