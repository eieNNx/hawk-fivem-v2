const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');

const sistemSchema = new mongoose.Schema({
  antibot: {
      type: Boolean,
      default: false
  },
  antireklam: {
      type: Boolean,
      default: false
  },
  günlükyetkiliverileri: {
      type: Boolean,
      default: false
  },
  günlükrolkaydetme: {
      type: Boolean,
      default: false
  },

})

module.exports = model('Sistem', sistemSchema);