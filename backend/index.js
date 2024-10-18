const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const User = require('./models/User'); // Import the User model

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/helpinghands', {
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Could not connect to MongoDB:', err.message);
});

// Register route - store user data in MongoDB
app.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create a new user instance
    const newUser = new User({ email, password: hashedPassword });
    
    // Save the user to the database
    await newUser.save();
    
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
  }
});

// Start the server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});

// Route to get all users from MongoDB
app.get('/users', async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from the database
    res.json(users); // Return the users in JSON format
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
});

app.get('/users/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user' });
  }
});

