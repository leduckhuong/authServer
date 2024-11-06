const express = require('express');
const router = express.Router();

const dataController = require('../../apps/controllers/data.controller');

router.post('/', dataController.index);

module.exports = router;