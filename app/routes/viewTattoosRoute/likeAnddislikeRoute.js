const express = require('express');
const router = express.Router();
const likeController = require('../../controllers/tattoosController/likeController');

router.post('/tattoos/:id/like', likeController.addLike);
router.post('/tattoos/:id/dislike', likeController.addDislike);

module.exports = router;
