const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  user_name: { type: String, required: true },
  user_age: { type: Number, required: true },
  user_gender: { type: String, required: true },
  user_district: { type: String, required: true },
  preferred_package: { type: String, required: true },
  site_usage_frequency: { type: Number, required: true },
  eco_ride_suggestions: { type: String, required: true },
  find_web: { type: String, required: true },
  like_post: { type: String, required: true },
  star_rating: { type: Number, required: true, min: 1, max: 5, default: 1 }, // Default value set to 0
  comment: { type: String, required: true, default: "Not commented" }, // Default value set to "Not commented"
  date_created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Feedback', feedbackSchema);