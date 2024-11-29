const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Constants = require('./utils/Constants');
const mongodb = require('./config/DatabaseConnection');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Connect to the database
(async () => {
    try {
        await mongodb();
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
app.listen(SERVERPORT, () => {
    console.log(`Server is running successfully on port ${SERVERPORT}`);
});

module.exports = app; // Export the app for use in `server.js` and testing
