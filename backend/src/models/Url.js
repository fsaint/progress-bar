const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  unique_id: {
    type: String,
    unique: true,
    required: true,
  },
  progress: Number,
  status: String,
  message: String,
  createdAt: {
    type: Date,
    default: Date.now, // Set the default value to the current date and time
  },
});

const Url = mongoose.model('Url', urlSchema);

module.exports = Url;
