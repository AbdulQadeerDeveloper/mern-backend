const express = require('express');
const router = express.Router();
const categoriesController = require('../../controllers/tattoosController/categoriesController');

router.post('/categories', categoriesController.addCategories);
router.get('/categories', categoriesController.getCategories);
router.get('/categories/:id', categoriesController.getIdCategories);
router.put('/categories/:id', categoriesController.updateCategories);
router.delete('/categories/:id', categoriesController.deleteCategories);
module.exports = router;
