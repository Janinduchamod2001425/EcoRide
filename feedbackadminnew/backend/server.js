const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors middleware
const feedbackRoutes = require('./routes/feedback.route');

const app = express();
const PORT = process.env.PORT || 3000;

// Use cors middleware to enable CORS
app.use(cors());

app.use(express.json());
app.use('/api/feedback', feedbackRoutes);

mongoose.connect('mongodb+srv://janinduchamod200125:ecoride_itp@ecoride.9me8fex.mongodb.net/EcoRide?retryWrites=true&w=majority&appName=EcoRide/feedbackDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));