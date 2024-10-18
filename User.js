const mongoose = require('mongoose');

// User Schema
const UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    maxlength: 50
  },
  last_name: {
    type: String,
    required: true,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email address'] // Email validation
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  phone_number: {
    type: String,
    maxlength: 15
  },
  address: {
    type: String
  },
  role: {
    type: String,
    enum: ['donor', 'receiver', 'admin'],
    default: 'receiver'
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

// Middleware to update `updated_at` field on save
UserSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

module.exports = mongoose.model('User', UserSchema);
