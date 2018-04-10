const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Status = new Schema({
  value: {
    type: Number
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const TeamSchema = new Schema({
  name: {
    type: String
  },
  position: {
    type: String
  },
  dob: {
    type: Date
  },
  education: {
    type: String
  },
  status: [Status],
  image: {
    type: String
  }
});

module.exports = mongoose.model('Team', TeamSchema, 'team');
