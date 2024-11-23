// controllers/courseController.js
const Course = require('../models/Course');

const courseController = {
  // Create a new course
  async createCourse(req, res) {
    try {
      const { title, description, startDate, prerequisites, mediaLinks, instructorId, price } = req.body;

      const course = await Course.create({
        title,
        description,
        instructorId, // Assuming `req.user.id` contains the instructor's ID
        startDate,
        prerequisites,
        mediaLinks,
        price
      });

      res.status(201).json({ message: "Course created successfully", course });
    } catch (error) {
      console.error("Error creating course:", error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  // Get all courses for catalog view
  async getAllCourses(req, res) {
    try {
      const courses = await Course.findAll();
      res.status(200).json(courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  // Get a single course by ID
  async getCourseById(req, res) {
    try {
      const course = await Course.findByPk(req.params.id);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      res.status(200).json(course);
    } catch (error) {
      console.error("Error fetching course:", error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  // Update a course
  async updateCourse(req, res) {
    try {
      const { title, description, startDate, prerequisites, mediaLinks, price } = req.body;
      const course = await Course.findByPk(req.params.id);

      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }

      // Only the instructor or an admin should be allowed to update the course
      if (course.instructorId !== req.user.id) {
        return res.status(403).json({ message: "Unauthorized to update this course" });
      }

      // Update course fields
      course.title = title || course.title;
      course.description = description || course.description;
      course.startDate = startDate || course.startDate;
      course.prerequisites = prerequisites || course.prerequisites;
      course.mediaLinks = mediaLinks || course.mediaLinks;
      course.price = price || course.price;

      await course.save();

      res.status(200).json({ message: "Course updated successfully", course });
    } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({ message: 'Server error' });
    }
  },

  // Delete a course
  async deleteCourse(req, res) {
    try {
      const course = await Course.findByPk(req.params.id);

      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }

      // Only the instructor or an admin should be allowed to delete the course
      if (course.instructorId !== req.user.id) {
        return res.status(403).json({ message: "Unauthorized to delete this course" });
      }

      await course.destroy();
      res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
      console.error("Error deleting course:", error);
      res.status(500).json({ message: 'Server error' });
    }
  }
};

module.exports = courseController;
