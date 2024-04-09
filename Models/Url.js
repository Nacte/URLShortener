const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  shortUrl: {
    type: String,
    required: true,
  },
  fullUrl: {
    type: String,
    required: true,
  },
  clicks: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('Url', urlSchema);
