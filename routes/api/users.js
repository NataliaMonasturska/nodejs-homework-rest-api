const express = require('express');
const { users: ctrl } = require('../../controllers');
const { validation, auth, upload } = require('../../middlewares');
const { ctrlWrapper } = require('../../helpers');
const { schemas } = require('../../models/user')
const router = express.Router();

router.get('/current', auth, ctrlWrapper(ctrl.getCurrent));
router.patch('/', auth, validation(schemas.joiFavoriteSchema), ctrlWrapper(ctrl.updateSubscription));
router.patch('/avatars',  auth, upload.single("avatar"),  ctrlWrapper(ctrl.updateAvatar) )

module.exports = router