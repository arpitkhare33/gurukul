// routes/instructorRoutes.js
const express = require('express');
const router = express.Router();
const passport = require('passport');
const instructorController = require('../controllers/instructorController');

// Routes
router.post('/create', passport.authenticate('jwt', { session: false }), instructorController.createInstructor);
router.get('/', instructorController.getInstructors);
router.get('/:id', instructorController.getInstructorById);
router.put('/update/:id', passport.authenticate('jwt', { session: false }), instructorController.updateInstructor);
router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), instructorController.deleteInstructor);

module.exports = router;
