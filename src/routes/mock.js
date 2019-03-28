const express = require('express');
const router = express.Router();

const container = require('../di').container;
const controller = container.resolve('mockController');

router.get('/', controller.message.bind(controller));

// router.delete('/:id', controller.deleteOrder.bind(controller));

module.exports = router;