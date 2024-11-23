const express = require('express');
const router = express.Router();
const passport = require('passport');
const batchController = require('../controllers/batchController');

// Routes for Batch
router.post('/create', passport.authenticate('jwt', { session: false }), batchController.createBatch);
router.get('/all', batchController.getAllBatches);
router.get('/:id', batchController.getBatchById);
router.put('/update/:id', passport.authenticate('jwt', { session: false }), batchController.updateBatch);
router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), batchController.deleteBatch);

module.exports = router;
