const express = require('express');
const router = express.Router();

const updateInfoController = require('../../apps/controllers/updateInfo.controller');

router.post('/', updateInfoController.index);

module.exports = router;