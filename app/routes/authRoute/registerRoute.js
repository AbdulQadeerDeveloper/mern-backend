const express = require('express');
const router = express.Router();
const registerController = require('../../controllers/authController/registerController');

router.post('/api/register', registerController.register);

module.exports = router;
