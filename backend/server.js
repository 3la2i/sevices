const express = require('express');
require('dotenv').config();
const port = 3000;
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// MongoDB connection URI
const uri = process.env.MONGODB_URI;


// Connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected successfully to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));


// Import routes



//
app.use(express.json());
app.use(cors());


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});