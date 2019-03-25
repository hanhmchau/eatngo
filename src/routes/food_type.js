const express = require('express');
const router = express.Router();

const container = require('../di').container;
const controller = container.resolve('foodTypeController');

router.get('/', controller.getFoodTypes.bind(controller));

module.exports = router;
