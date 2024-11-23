// controllers/instructorController.js
const Instructor = require('../models/Instructor');

const instructorController = {
  async createInstructor(req, res) {
    try {
      const { name, bio, contact, expertise, email } = req.body;
      const newInstructor = await Instructor.create({ name, bio, contact, expertise, email });
      res.status(201).json(newInstructor);
    } catch (error) {
      console.error("Error creating instructor:", error);
      res.status(500).json({ message: "Server error" });
    }
  },

  async getInstructors(req, res) {
    try {
      const instructors = await Instructor.findAll();
      res.status(200).json(instructors);
    } catch (error) {
      console.error("Error fetching instructors:", error);
      res.status(500).json({ message: "Server error" });
    }
  },

  async getInstructorById(req, res) {
    try {
      const { id } = req.params;
      const instructor = await Instructor.findByPk(id);
      if (instructor) {
        res.status(200).json(instructor);
      } else {
        res.status(404).json({ message: "Instructor not found" });
      }
    } catch (error) {
      console.error("Error fetching instructor:", error);
      res.status(500).json({ message: "Server error" });
    }
  },

  async updateInstructor(req, res) {
    try {
      const { id } = req.params;
      const { name, bio, contact, expertise } = req.body;
      const [updatedRows] = await Instructor.update(
        { name, bio, contact, expertise },
        { where: { id } }
      );

      if (updatedRows > 0) {
        const updatedInstructor = await Instructor.findByPk(id);
        res.status(200).json(updatedInstructor);
      } else {
        res.status(404).json({ message: "Instructor not found" });
      }
    } catch (error) {
      console.error("Error updating instructor:", error);
      res.status(500).json({ message: "Server error" });
    }
  },

  async deleteInstructor(req, res) {
    try {
      const { id } = req.params;
      const deletedRows = await Instructor.destroy({ where: { id } });

      if (deletedRows > 0) {
        res.status(200).json({ message: "Instructor deleted successfully" });
      } else {
        res.status(404).json({ message: "Instructor not found" });
      }
    } catch (error) {
      console.error("Error deleting instructor:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
};

module.exports = instructorController;
