const express = require('express');
const router = express.Router();

const container = require('../di').container;
const controller = container.resolve('foodController');

router.get('/', controller.getFoods.bind(controller));
router.get('/:id', controller.getFoodById.bind(controller));
router.post('/', controller.createFood.bind(controller));
router.put('/:id', controller.updateFood.bind(controller));
router.delete('/:id', controller.deleteFood.bind(controller));

module.exports = router;
