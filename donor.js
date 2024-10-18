const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Donation Schema
const DonationSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Foreign key to Users
    required: true
  },
  item_name: {
    type: String,
    required: true,
    maxlength: 100
  },
  description: {
    type: String
  },
  category: {
    type: String,
    enum: ['food', 'clothes', 'books', 'electronics'],
    required: true
  },
  quantity: {
    type: Number,
    default: 1
  },
  location: {
    type: String
  },
  status: {
    type: String,
    enum: ['available', 'booked', 'delivered'],
    default: 'available'
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
DonationSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

module.exports = mongoose.model('Donation', DonationSchema);
