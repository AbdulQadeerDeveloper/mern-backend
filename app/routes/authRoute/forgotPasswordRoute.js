const express = require('express');
const router = express.Router();
const forgotController = require('../../controllers/authController/forgotController'); // Import the loginController

router.post('/forgot-password', forgotController.forgotPassword);

module.exports = router;
