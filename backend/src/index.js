const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Constants = require('./utils/Constants');
const { DatabaseConnection } = require('./config/DatabaseConnection');
require('dotenv').config();

const app = express();

// Define the server port (from environment variable or default to 8080)
const SERVERPORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Connect to the database
(async () => {
    try {
        await DatabaseConnection(); // Ensure DatabaseConnection is properly imported
    } catch (error) {
        console.error(`Database Connection Error: ${error.message}`);
        process.exit(1); // Exit the process if DB connection fails
    }
})();

// Routes
const authRoute = require('./routes/AuthRoute');
const profileRoute = require('./routes/ProfileRoute');
const itemRoute = require('./routes/ItemRoute');
const requestRoute = require('./routes/RequestRoute');

app.use('/api/auth', authRoute);
app.use('/profile', profileRoute);
app.use('/item', itemRoute);
app.use('/request', requestRoute);

// Start the server
if (process.env.NODE_ENV !== 'test') { // Avoid starting the server during tests
    app.listen(SERVERPORT, () => {
        console.log(`Server is running successfully on port ${SERVERPORT}`);
    });
}

module.exports = app; // Export the app for use in `server.js` and testing
