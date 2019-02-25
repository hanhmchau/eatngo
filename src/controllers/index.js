const express = require('express');
const router = express.Router();

router.use('/brands', require('./brand'));

module.exports = router;