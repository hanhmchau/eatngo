const express = require('express');
const router = express.Router();
const container = require('../di').container;
const controller = container.resolve('storeController');

router.get('/', controller.getStores.bind(controller));
router.get('/:id', controller.getStoreById.bind(controller));
router.get('/:id/orders', controller.getOrderItemsByStore.bind(controller));
router.post('/', controller.createStore.bind(controller));
router.put('/:id', controller.updateStore.bind(controller));
router.delete('/:id', controller.deleteStore.bind(controller));

module.exports = router;
