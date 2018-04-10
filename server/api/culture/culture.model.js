const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CultureSchema = new Schema({
  file: {
    type: String,
    default: ''
  }
});

module.exports = mongoose.model('Culture', CultureSchema, 'culture');
