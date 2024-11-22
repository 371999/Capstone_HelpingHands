require('dotenv').config();
const mongoose = require('mongoose');

const DatabaseConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log(`Database connection established successfully`);
    } catch (e) {
        console.error(`Database Connection Error: ${e.message}`);
    }
};

const disconnect = async () => {
    try {
        await mongoose.disconnect();
        console.log(`Database connection closed successfully`);
    } catch (e) {
        console.error(`Error closing database connection: ${e.message}`);
    }
};

module.exports = {
    connect: DatabaseConnection,
    disconnect,
};
