const mongoose = require('mongoose');

// Define a User schema with email and password fields
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true }, // email field
  password: { type: String, required: true }, // password field
});

// Create a User model based on the schema
const User = mongoose.model('User', userSchema);

module.exports = User;

