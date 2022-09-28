const Joi = require('joi');


const joiSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.number().required(),
    favorite: Joi.boolean()
  });

  module.exports = {
    joiSchema
  }