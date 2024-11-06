const express = require('express');
const router = express.Router();

const logoutController = require('../../apps/controllers/logout.controller');

router.post('/', logoutController.index);

module.exports = router;