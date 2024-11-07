const mongoose = require('mongoose');

const pickupSchema = new mongoose.Schema({
  donation: { type: mongoose.Schema.Types.ObjectId, ref: 'Donation', required: true },
  status: { type: String, default: 'pending' },  // pending, completed
  type: { type: String, required: true },        // delivery or pickup
  scheduleDate: { type: Date, required: true },
 // trackingId: { type: String, required: false },  // For third-party delivery tracking
  completed: { type: Boolean, default: false },   // Status of the pickup
});

module.exports = mongoose.model('Pickup', pickupSchema);
