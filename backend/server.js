const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const contentRoutes = require('./Routes/contentRoutes');
const { createInitialContent } = require('./Controllers/contentController');
const projectRoutes = require('./Routes/projectRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Configure CORS
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/content', contentRoutes);
app.use('/api/projects', projectRoutes);

// Test route
app.get('/test', (req, res) => {
  res.json({ message: 'Backend is running!' });
});

// Connect to MongoDB and start server
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Create initial content
    await createInitialContent();
    
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();