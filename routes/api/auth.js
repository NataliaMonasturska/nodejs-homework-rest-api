const express = require('express');
const { validation, } = require('../../middlewares');
const { ctrlWrapper } = require('../../helpers');
const { auth: ctrl } = require('../../controllers');
const { User, joiSchema} = require('../../models/user')

const router = express.Router();
router.post("/register", validation(joiSchema), ctrlWrapper(ctrl.register));
// или так по дз
// router.post("/signup")
router.post("/login", validation(joiSchema), ctrlWrapper(ctrl.login));
module.exports = router