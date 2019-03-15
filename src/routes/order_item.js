const express = require('express');
const router = express.Router();

const container = require('../di').container;
const controller = container.resolve('orderItemController');

router.get('/', controller.getOrderItems.bind(controller));
router.get('/:id', controller.getOrderItemById.bind(controller));
router.post('/', controller.createOrder.bind(controller));
router.put('/:id', controller.updateOrder.bind(controller));

// router.delete('/:id', controller.deleteOrder.bind(controller));

module.exports = router;
