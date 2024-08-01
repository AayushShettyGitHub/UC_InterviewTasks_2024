const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  gender: { type: String, required: true },
  house: { type: String, required: true },
  wizard: { type: Boolean, required: true }
});

module.exports = mongoose.model('Student', studentSchema);
