const express = require('express');
const router = express.Router();
const businessController = require('../../controllers/tattoosController/businessController');

router.post('/api/upload', businessController.addBusinessPlain);
router.get('/api/business-plans/:id', businessController.getByIdBusinessPlain);
router.get('/api/business-plans', businessController.getAllBusinessPlain);
router.delete('/api/business-plans/:id', businessController.deleteBusinessPlain);
module.exports = router;
