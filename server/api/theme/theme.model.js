const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ThemeSchema = new Schema({
  day: {
    type: String
  },
  theme: {
    type: String,
    default: ''
  }
});

module.exports = mongoose.model('Theme', ThemeSchema, 'theme');
