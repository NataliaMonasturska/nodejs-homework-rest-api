const { Schema, model } = require("mongoose");
const Joi = require('joi');
const {handleSaveErrors} = require("../middlewares")

const contactSchema = new Schema({
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


contactSchema.post("save", handleSaveErrors);

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.number().required(),
  favorite: Joi.boolean()
});

const joiFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required()
});

const schemas = {
  joiSchema,
  joiFavoriteSchema
}

const Contact = model("contact", contactSchema);
module.exports = {
  Contact,
  schemas
}