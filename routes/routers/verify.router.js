const express = require('express');
const router = express.Router();

const verifyController = require('../../apps/controllers/verify.controller');

router.post('/', verifyController.index);

module.exports = router;