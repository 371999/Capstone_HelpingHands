require('dotenv').config();
const mongoose = require('mongoose');

const DatabaseConnection = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI environment variable is not set.');
        }
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Database connection established successfully');
    } catch (e) {
        console.error(`Database Connection Error: ${e.message}`);
        throw e; // Re-throw to handle initialization failure
    }
};

module.exports = DatabaseConnection;
