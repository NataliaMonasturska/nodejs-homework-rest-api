const express = require('express');
const { validation, ctrlWrapper } = require('../../middlewares');
const { schemas} = require('../../models/contacts');
const { contacts: ctrl } = require('../../controllers');

const validateMiddleware = validation( schemas.joiSchema);

const router = express.Router();

router.get('/', ctrlWrapper(ctrl.getAll));

router.get('/:contactId', ctrlWrapper(ctrl.getById));

router.post('/', validateMiddleware, ctrlWrapper(ctrl.add));

router.delete('/:contactId', ctrlWrapper(ctrl.removeById));

router.put('/:contactId', validateMiddleware, ctrlWrapper(ctrl.updateById));

router.patch('/:contactId/favorite', ctrlWrapper(ctrl.updateFavorite));

module.exports = router
