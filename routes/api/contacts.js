const express = require('express');
const { validation, isValidId, auth } = require('../../middlewares');
const { ctrlWrapper } = require('../../helpers');
const { schemas } = require('../../models/contacts');
const { contacts: ctrl } = require('../../controllers');

const validateMiddleware = validation(schemas.joiSchema);


const router = express.Router();

router.get('/', auth, ctrlWrapper(ctrl.getAll));

router.get('/:contactId', auth, isValidId, ctrlWrapper(ctrl.getById));

router.post('/', auth, validateMiddleware, ctrlWrapper(ctrl.add));

router.delete('/:contactId', auth, isValidId, ctrlWrapper(ctrl.removeById));

router.put('/:contactId', auth, isValidId, validateMiddleware, ctrlWrapper(ctrl.updateById));

router.patch('/:contactId/favorite', auth, isValidId, validation(schemas.joiFavoriteSchema), ctrlWrapper(ctrl.updateFavorite));

module.exports = router
