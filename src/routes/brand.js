const express = require('express');
const router = express.Router();

const container = require('../di').container;
const controller = container.resolve('brandController');

router.get('/', controller.getBrands.bind(controller));
router.get('/:id', controller.getBrandById.bind(controller));
router.post('/', controller.createBrand.bind(controller));
router.put('/:id', controller.updateBrand.bind(controller));
router.delete('/:id', controller.deleteBrand.bind(controller));
router.get('/:id/stores', controller.getStoresByBrand.bind(controller));
router.get('/:id/managers', controller.getManagersByBrand.bind(controller));
router.get('/:id/order-items', controller.getOrdersByBrand.bind(controller));

module.exports = router;
