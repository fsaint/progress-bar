const mongoose = require('mongoose');
const BASEURL = 'https://progressbar.fsj.pw'
const urlSchema = new mongoose.Schema({
  title: {
    type: String, 
    unique: false, 
    require: false,
    default: function () {
      return "Progress Bar"
    }
  },
  unique_id: {
    type: String,
    unique: true,
    required: true,
  },
  progress: Number,
  status: {
    type: String,
    enum: ['PENDING', 'IN_PROGRESS', 'STALLED', 'FAILED', 'FINISHED'],
    default: 'PENDING'
  },
  message: String,
  createdAt: {
    type: Date,
    default: Date.now, // Set the default value to the current date and time
  },
  lastUpdate: {
    type: Date,
    require: false
  },
  url: {
    type: String,
    default: function() {
      return BASEURL + 'bar/' + this.unique_id
    }
  }
});

const Url = mongoose.model('Url', urlSchema);

module.exports = Url;
