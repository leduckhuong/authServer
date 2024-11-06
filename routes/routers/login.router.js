const express = require('express');
const router = express.Router();

const loginController = require('../../apps/controllers/login.controller');

router.post('/firebase', loginController.firebase);
router.post('/', loginController.index);

module.exports = router;