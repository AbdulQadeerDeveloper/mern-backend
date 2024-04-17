const express = require('express');
const router = express.Router();
const loginController = require('../../controllers/authController/loginController');

router.post('/login', loginController.login);
router.get('/users', loginController.getAllloginUsers);
router.delete('/users/:id', loginController.loginDelete);

module.exports = router;
