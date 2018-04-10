const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  title: {
    type: String
  },
  description: {
    type: String,
    default: ''
  },
  file: {
    type: String,
    default: ''
  }
});

module.exports = mongoose.model('Product', ProductSchema, 'product');
