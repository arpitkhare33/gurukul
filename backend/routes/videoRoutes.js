const express = require('express');
const router = express.Router();
const passport = require('passport');
const videoController = require('../controllers/videoController');

// Routes
router.post('/create', passport.authenticate('jwt', { session: false }), videoController.createVideo);
router.get('/all', videoController.getAllVideos);
router.get('/:id', videoController.getVideoById);
router.put('/update/:id', passport.authenticate('jwt', { session: false }), videoController.updateVideo);
router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), videoController.deleteVideo);

module.exports = router;
