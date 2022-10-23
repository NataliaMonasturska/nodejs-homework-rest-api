const { Schema, model } = require("mongoose");
const Joi = require('joi');
const { handleSaveErrors } = require("../helpers");

const userSchema = new Schema({
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    token: {
        type: String,
        default: null,
    },
    avatarURL: {
        type: String,
        required: true,
    },
    verify: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
        required: [true, 'Verify token is required'],
    }
},
    {
        versionKey: false, timestamps: true
    }
);

userSchema.post("save", handleSaveErrors);

const joiSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
});
const joiFavoriteSchema = Joi.object({
    subscription: Joi.string().required().valid("starter", "pro", "business")
});

const joiVerifyEmailSchema = Joi.object({
    email: Joi.string().required(),
});



const User = model("user", userSchema)
const schemas = {
    joiSchema,
    joiFavoriteSchema,
    joiVerifyEmailSchema
}
module.exports = {
    User,
    schemas

}