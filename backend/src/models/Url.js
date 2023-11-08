const mongoose = require('mongoose');
const BASEURL = 'http://localhost:3000/'
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

  url: {
    type: String,
    default: function() {
      return BASEURL + 'progress/' + this.unique_id
    }
  }
});

const Url = mongoose.model('Url', urlSchema);

module.exports = Url;
