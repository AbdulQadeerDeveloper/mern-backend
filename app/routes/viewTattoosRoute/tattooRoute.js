const express = require('express');
const router = express.Router();
const tattooController = require('../../controllers/tattoosController/tattooController');

router.post('/createTattoos', tattooController.addTattoo);
router.get('/addTattoosbyId', tattooController.getTattoo);
router.get('/addTattoosbyId/:id', tattooController.getIdByTattoos);
router.put('/updateTattoo/:id', tattooController.updateTattoo);
router.delete('/api/tattoos/:id', tattooController.deleteTattoo);
router.put('/api/tattoos/:id/status', tattooController.updateStatusTattoo);
router.get('/api/tattoos/status/approved', tattooController.updateStatusApprovedTattoo);
router.get('/api/tattoos/status/rejected', tattooController.getStatusRejectTattoo);
router.get('/api/tattoos/status/pending', tattooController.getStatusPendingTattoo);
router.get('/search-tattoos/:key', tattooController.searchTattoos);
router.get('/pagnination-tattoos', tattooController.pagination);
router.get('/api/tattoos', tattooController.sortByTatoos);
module.exports = router;
