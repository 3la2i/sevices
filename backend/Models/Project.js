const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false
  },
  link: {
    type: String,
    required: false
  },
  technologies: [{
    type: String
  }],
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  status: {
    type: String,
    enum: ['in-progress', 'completed'],
    default: 'in-progress'
  }
  

},

 {
  timestamps: true
});

module.exports = mongoose.model('Project', projectSchema); 