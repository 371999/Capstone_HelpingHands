const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
    requestType: {
        type: String,
        required: true,
        enum: ['delivery', 'pick up'], // Limits to these two types
    },
    requestDate: {
        type: Date,
        required: true,
    },
    comments: {
        type: String,
        required: false,
    },
    userId: {
        type: String,
        required: true, // Ensure the request is tied to a specific user
    },
    ownerId: {
        type: String,
        required: true,
    },
    itemId: {
        type: String, // Store itemId as a string
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    status: {
        type: Number,
        required: true,
        default: 0,
    },
    message: {
        type: String,
        required: false,
        description: 'Message from the user to the owner',
    },
}, { timestamps: true });

module.exports = mongoose.model('Request', RequestSchema);
