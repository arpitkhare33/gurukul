const express = require('express');
const router = express.Router();
const passport = require('passport');
const courseController = require('../controllers/courseController');

// Routes
router.post('/create', passport.authenticate('jwt', { session: false }), courseController.createCourse);
router.get('/all', courseController.getAllCourses);
router.get('/:id', courseController.getCourseById);
router.put('/update/:id', passport.authenticate('jwt', { session: false }), courseController.updateCourse);
router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), courseController.deleteCourse);

module.exports = router;
