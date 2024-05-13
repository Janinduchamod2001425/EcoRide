const express = require('express');
const router = express.Router();
const Feedback = require('../model/feedback.model');

// Create a new feedback entry
router.post('/submit-feedback', async (req, res) => {
  try {
    const {
      user_name,
      user_age,
      user_gender,
      user_district,
      preferred_package,
      site_usage_frequency,
      eco_ride_suggestions,
      find_web,
      like_post,
      star_rating,
      comment
    } = req.body;

    // Create a new feedback object
    const newFeedback = new Feedback({
      user_name,
      user_age,
      user_gender,
      user_district,
      preferred_package,
      site_usage_frequency,
      eco_ride_suggestions,
      find_web,
      like_post,
      star_rating,
      comment
    });

    // Validate the feedback data
    const validationError = newFeedback.validateSync();
    if (validationError) {
      throw validationError;
    }

    // Save the new feedback to the database
    await newFeedback.save();

    res.status(200).send('Feedback submitted successfully.');
  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).send('Error submitting feedback: ' + error.message);
  }
});

// Get all feedback entries
router.get('/get-feedback', async (req, res) => {
  try {
    const feedbackEntries = await Feedback.find();
    res.status(200).json(feedbackEntries);
  } catch (error) {
    res.status(500).send('Error fetching feedback entries.');
  }
});

// Get a specific feedback entry by ID
router.get('/get-feedback/:id', async (req, res) => {
  try {
    const feedbackEntry = await Feedback.findById(req.params.id);
    if (!feedbackEntry) {
      return res.status(404).send('Feedback entry not found.');
    }
    res.status(200).json(feedbackEntry);
  } catch (error) {
    res.status(500).send('Error fetching feedback entry.');
  }
});

// Update a specific feedback entry by ID
router.put('/update-feedback/:id', async (req, res) => {
  try {
    const { user_name, user_age, user_gender, user_district, preferred_package, site_usage_frequency, eco_ride_suggestions, find_web, like_post } = req.body;

    const updatedFeedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      {
        user_name,
        user_age,
        user_gender,
        user_district,
        preferred_package,
        site_usage_frequency,
        eco_ride_suggestions,
        find_web,
        like_post
      },
      { new: true }
    );

    if (!updatedFeedback) {
      return res.status(404).send('Feedback entry not found.');
    }
    res.status(200).json(updatedFeedback);
  } catch (error) {
    res.status(500).send('Error updating feedback entry.');
  }
});

router.put('/update-ratings/:id', async (req, res) => {
  try {
    const { star_rating, comment } = req.body;

    const updatedFeedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      { star_rating, comment },
      { new: true }
    );

    if (!updatedFeedback) {
      return res.status(404).send('Feedback entry not found.');
    }

    res.status(200).json(updatedFeedback);
  } catch (error) {
    res.status(500).send('Error updating feedback.');
  }
});

// Delete a specific feedback entry by ID
router.delete('/delete-feedback/:id', async (req, res) => {
  try {
    const deletedFeedback = await Feedback.findByIdAndDelete(req.params.id);
    if (!deletedFeedback) {
      return res.status(404).send('Feedback entry not found.');
    }
    res.status(200).send('Feedback entry deleted successfully.');
  } catch (error) {
    res.status(500).send('Error deleting feedback entry.');
  }
});

module.exports = router;