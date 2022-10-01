const express = require('express');
const { validation, isValidId } = require('../../middlewares');
const { ctrlWrapper } = require('../../helpers');
const { schemas } = require('../../models/contacts');
const { contacts: ctrl } = require('../../controllers');

const validateMiddleware = validation(schemas.joiSchema);


const router = express.Router();

router.get('/', ctrlWrapper(ctrl.getAll));

router.get('/:contactId', isValidId, ctrlWrapper(ctrl.getById));

router.post('/', validateMiddleware, ctrlWrapper(ctrl.add));

router.delete('/:contactId', isValidId, ctrlWrapper(ctrl.removeById));

router.put('/:contactId', isValidId, validateMiddleware, ctrlWrapper(ctrl.updateById));

router.patch('/:contactId/favorite', isValidId, validation(schemas.joiFavoriteSchema), ctrlWrapper(ctrl.updateFavorite));

module.exports = router
