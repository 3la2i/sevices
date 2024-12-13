const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  section: {
    type: String,
    enum: ['hero', 'vision', 'about', 'services',],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  order: {
    type: Number,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  items: [{
    title: String,
    description: String,
    link: String,
    technologies: [String],
    image: String
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Content', contentSchema); 