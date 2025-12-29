const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  modelUrl: {
    type: String,
    required: true,
    trim: true,
  },
  thumbnail: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  scale: {
    type: Number,
    default: 1.0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Model', modelSchema);

