const express = require('express');
const router = express.Router();

const container = require('../di').container;
const controller = container.resolve('memberController');

// router.get('/', controller.g.bind(controller));
router.get('/:id', controller.getMemberById.bind(controller));
router.get('/authorize', controller.login.bind(controller));
router.post('/', controller.register.bind(controller));
router.put('/:id', controller.updateMember.bind(controller));
router.get('/:id/orders', controller.getOrdersByMember.bind(controller));

// router.delete('/:id', controller.deleteOrder.bind(controller));

module.exports = router;
