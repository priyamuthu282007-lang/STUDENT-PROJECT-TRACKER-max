const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name venum da']
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  department: {
    type: String,
    default: 'IT'
  },
  role: {
    type: String,
    enum: ['student', 'admin', 'guide'],
    default: 'student'
  }
}, { timestamps: true });

// Password hash pannum
userSchema.pre('save', async function(next){
  if(!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Password check panna method
userSchema.methods.comparePassword = function(enteredPassword){
  return bcrypt.compare(enteredPassword, this.password);
}

module.exports = mongoose.model('User', userSchema);