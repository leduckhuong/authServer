const express = require('express');
const router = express.Router();

const tokenController = require('../../apps/controllers/token.controller');

router.post('/', tokenController.index);

module.exports = router;