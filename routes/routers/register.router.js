const express = require('express');
const router = express.Router();

const registerController = require('../../apps/controllers/register.controller');

router.post('/firebase', registerController.firebase);
router.post('/', registerController.index);

module.exports = router;