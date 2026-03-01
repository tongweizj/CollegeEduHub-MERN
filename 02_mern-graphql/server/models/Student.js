// Student model
const bcrypt  = require('bcrypt');
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
StudentSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password.trim(), salt);
  this.password = hashedPassword;
});
module.exports = mongoose.model('Student', StudentSchema);
