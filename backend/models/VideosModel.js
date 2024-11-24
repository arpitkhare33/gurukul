const Video = require('../models/Videos');

// Create a new video
exports.createVideo = async (req, res) => {
  try {
    const { title, description, url, duration, metadata, is_required, content_type, order_in_series, batch_id } = req.body;
    const video = await Video.create({ title, description, url, duration, metadata, is_required, content_type, order_in_series, batch_id });
    res.status(201).json(video);
  } catch (error) {
    console.error("Error creating video:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all videos
exports.getAllVideos = async (req, res) => {
  try {
    const videos = await Video.findAll();
    res.status(200).json(videos);
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get a video by ID
exports.getVideoById = async (req, res) => {
  try {
    const video = await Video.findByPk(req.params.id);
    if (!video) return res.status(404).json({ message: "Video not found" });
    res.status(200).json(video);
  } catch (error) {
    console.error("Error fetching video:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update a video by ID
exports.updateVideo = async (req, res) => {
  try {
    const video = await Video.findByPk(req.params.id);
    if (!video) return res.status(404).json({ message: "Video not found" });

    const { title, description, url, duration, metadata, is_required, content_type, order_in_series, batch_id } = req.body;
    await video.update({ title, description, url, duration, metadata, is_required, content_type, order_in_series, batch_id });
    res.status(200).json(video);
  } catch (error) {
    console.error("Error updating video:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a video by ID
exports.deleteVideo = async (req, res) => {
  try {
    const video = await Video.findByPk(req.params.id);
    if (!video) return res.status(404).json({ message: "Video not found" });

    await video.destroy();
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting video:", error);
    res.status(500).json({ message: "Server error" });
  }
};
