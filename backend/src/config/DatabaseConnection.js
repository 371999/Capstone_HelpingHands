require('dotenv').config();
const mongoose = require('mongoose');

const DatabaseConnection = async () => {
    try {
        if (process.env.NODE_ENV === 'test') {
            console.log('Skipping database connection in test environment');
            return;
        }

        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI environment variable is not set.');
        }

        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database connection established successfully');
    } catch (e) {
        console.error(`Database Connection Error: ${e.message}`);
        if (process.env.NODE_ENV !== 'test') {
            process.exit(1); // Terminate only in non-test environments
        } else {
            throw e; // Rethrow error in test environments for Jest to handle
        }
    }
};

module.exports = DatabaseConnection;
