const express = require('express');
const router = express.Router();
const commentController = require('../../controllers/tattoosController/commentController');
router.post('/submitComment/:id', commentController.addComment);
router.get('/tattoos/:tattooId/comments', commentController.getComment);
router.post('/comments/:id', commentController.updateComment);
router.post('/comments/:id', commentController.deleteComment);
module.exports = router;
