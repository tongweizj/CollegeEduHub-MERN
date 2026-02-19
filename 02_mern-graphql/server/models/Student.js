// Student model
const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  studentNumber: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  program: { type: String, required: true },
  enrolledCourse: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }]
});

module.exports = mongoose.model('Student', StudentSchema);
