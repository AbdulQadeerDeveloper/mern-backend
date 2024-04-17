const express = require('express');
const router = express.Router();
const logoutController = require('../../controllers/authController/logoutController'); 

router.get('/logout', logoutController.logoutAuth);

module.exports = router;
