const express = require('express');
const router = express.Router();

const container = require('../di').container;
const controller = container.resolve('promotionCodeController');

router.get('/', controller.getPromotionCodes.bind(controller));
router.get('/:id', controller.getPromotionCodeById.bind(controller));
router.post('/', controller.createPromotionCode.bind(controller));
router.put('/:id', controller.updatePromotionCode.bind(controller));
router.delete('/:id', controller.deletePromotionCode.bind(controller));

module.exports = router;
