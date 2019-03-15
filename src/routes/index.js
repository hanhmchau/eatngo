const express = require('express');
const router = express.Router();

router.use('/brands', require('./brand'));
router.use('/stores', require('./store'));
router.use('/members', require('./member'));
router.use('/foods', require('./food'));
router.use('/order-items', require('./order_item'));

module.exports = router;