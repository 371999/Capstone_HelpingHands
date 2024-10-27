const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  donor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  location: {
    lat: { type: Number, required: true },  // Latitude
    lng: { type: Number, required: true },  // Longitude
  },
  status: { type: String, default: 'available' },
  imageUrl: { type: String, required: false },
});

module.exports = mongoose.model('Donation', donationSchema);