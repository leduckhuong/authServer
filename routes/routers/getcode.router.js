const express = require('express');
const router = express.Router();

const getcodeController = require('../../apps/controllers/getcode.controller');

router.post('/', getcodeController.index);

module.exports = router;