const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const Constants = require('./utils/Constants');
const mongodb = require('./config/DatabaseConnection');
const authRoute = require('./routes/AuthRoute');
const profileRoute = require('./routes/ProfileRoute');
const itemRoute = require('./routes/ItemRoute');
const requestRoute = require('./routes/RequestRoute');
const cors = require('cors');

app.use(cors());

const SERVERPORT = process.env.PORT || 8080;
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

try{
    mongodb();
}
catch(e){
    console.error(e.message);
}

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use('/api/auth', authRoute);
app.use('/profile', profileRoute);
app.use('/item', itemRoute);
app.use('/request', requestRoute);
// server.get("/items/getAll", itemsController.getAllItems);

app.get('/', (req, res) => {
    res.send(Constants.BASEROUTEMSG);
});

app.listen(SERVERPORT, () => {
    console.log('Server is up and running successfully.');
});

module.exports = app;


