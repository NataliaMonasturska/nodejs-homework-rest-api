// const fs = require('fs/promises');
// const path = require("path");
// const { uid } = require("uid");
const Joi = require('joi');
const {Schema, model} = require("mongoose");
const contactSchema = Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
},
 {
  versionKey: false, timestamps: true
}
);


const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.number().required(),
  favorite: Joi.boolean().required(),
});


const Contact = model("contact", contactSchema);
module.exports = {
  Contact,
  joiSchema
}
// const contactsPath = path.join(__dirname, "./contacts.json")

// const listContacts = async () => {
//   const contacts = await fs.readFile(contactsPath, "utf-8");
//   return JSON.parse(contacts);
// }

// const getContactById = async (contactId) => {
//   const id = contactId.toString();
//   const contacts = await listContacts();
//   const contactByID = contacts.find((contact) => contact.id === id);
//   return contactByID || null
// }

// const removeContact = async (contactId) => {
//   const id = contactId.toString();

//   const contacts = await listContacts();
//   const index = contacts.findIndex(item => item.id === id);
//   if (index === -1) {
//     return null;
//   }
//   const [result] = contacts.splice(index, 1);
//   const newContactsJson = JSON.stringify(contacts, null, 2);
//   await fs.writeFile(contactsPath, newContactsJson);
//   return result;
// }

// const addContact = async (body) => {
//   const contacts = await listContacts();
//   const newContact = {
//     id: uid(),
//     name: body.name,
//     email: body.email,
//     phone: body.phone,
//   };
//   contacts.push(newContact);
//   const newContactsJson = JSON.stringify(contacts, null, 2);
//   await fs.writeFile(contactsPath, newContactsJson)
//   return newContact;
// }

// const updateContact = async (contactId, body) => {
//   const id = contactId.toString();
//   const contacts = await listContacts();
//   const contact = contacts.find(i => i.id === id);
//   if (contact === undefined) {
//     return null
//   }
//   contact.name = body.name;
//   contact.email = body.email;
//   contact.phone = body.phone;
//   const newContactsJson = JSON.stringify(contacts, null, 2);
//   await fs.writeFile(contactsPath, newContactsJson);
//   return contact;
// }

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// }

