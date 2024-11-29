const app = require('./src/index'); // Import the app (or 'app.js' if you rename it)
const SERVERPORT = process.env.PORT || 8080;

// Start the server
app.listen(SERVERPORT, () => {
    console.log(`Server is running successfully on port ${SERVERPORT}`);
});
