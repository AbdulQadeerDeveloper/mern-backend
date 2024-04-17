const express = require('express');
const router = express.Router();
const restPassController = require('../../controllers/authController/restPassController');

router.post('/reset-password/:id/:token', restPassController.resetPassword);

module.exports = router;
