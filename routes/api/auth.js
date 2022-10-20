const express = require('express');
const { validation, auth } = require('../../middlewares');
const { ctrlWrapper } = require('../../helpers');
const { auth: ctrl } = require('../../controllers');
const { schemas } = require('../../models/user')

const router = express.Router();
router.post("/register", validation(schemas.joiSchema), ctrlWrapper(ctrl.register));

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verify) )
// или так по дз
// router.post("/signup")
router.post("/login", validation(schemas.joiSchema), ctrlWrapper(ctrl.login));

router.get("/logout", auth, ctrlWrapper(ctrl.logout))
module.exports = router