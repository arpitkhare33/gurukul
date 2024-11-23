const Batch = require('../models/Batch');

const batchController = {
  async createBatch(req, res) {
    try {
      const batchData = req.body;
      const batch = await Batch.create(batchData);
      res.status(201).json(batch);
    } catch (error) {
      console.error("Error creating batch:", error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  async getAllBatches(req, res) {
    try {
      const batches = await Batch.findAll();
      res.status(200).json(batches);
    } catch (error) {
      console.error("Error fetching batches:", error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  async getBatchById(req, res) {
    try {
      const batch = await Batch.findByPk(req.params.id);
      if (!batch) return res.status(404).json({ message: 'Batch not found' });
      res.status(200).json(batch);
    } catch (error) {
      console.error("Error fetching batch:", error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  async updateBatch(req, res) {
    try {
      const batch = await Batch.findByPk(req.params.id);
      if (!batch) return res.status(404).json({ message: 'Batch not found' });
      await batch.update(req.body);
      res.status(200).json(batch);
    } catch (error) {
      console.error("Error updating batch:", error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  async deleteBatch(req, res) {
    try {
      const batch = await Batch.findByPk(req.params.id);
      if (!batch) return res.status(404).json({ message: 'Batch not found' });
      await batch.destroy();
      res.status(200).json({ message: 'Batch deleted' });
    } catch (error) {
      console.error("Error deleting batch:", error);
      res.status(500).json({ message: 'Server error' });
    }
  },
};

module.exports = batchController;
