const express = require('express');
const router = express.Router();
const placementController = require('../../controllers/tattoosController/placementController');

router.post('/placements', placementController.addPlacement);
router.get('/placements', placementController.getPlacement);
router.get('/placements/:id', placementController.getIdPlacement);
router.put('/placements/:id', placementController.updatePlacement);
router.delete('/placements/:id', placementController.deletePlacement);
module.exports = router;
