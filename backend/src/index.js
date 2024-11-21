const express = require('express');
const app = express(); // Rename `server` to `app` for the Express application
require('dotenv').config();
const bodyParser = require('body-parser');
const Constants = require('./utils/Constants');
const mongodb = require('./config/DatabaseConnection');
const authRoute = require('./routes/AuthRoute');
const profileRoute = require('./routes/ProfileRoute');
const itemRoute = require('./routes/ItemRoute');
const requestRoute = require('./routes/RequestRoute');
const cors = require('cors');

app.use(cors()); // Use `app` here

const SERVERPORT = process.env.PORT || 8080;
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

try {
    mongodb();
} catch (e) {
    console.error(e.message);
}

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use('/api/auth', authRoute);
app.use('/profile', profileRoute);
app.use('/item', itemRoute);
app.use('/request', requestRoute);

app.get('/', (req, res) => {
    res.send(Constants.BASEROUTEMSG);
});

const server = app.listen(SERVERPORT, () => { // Create the HTTP server
    console.log('Server is up and running successfully on port ' + SERVERPORT);
});

module.exports = { app, server };
