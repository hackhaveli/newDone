// Import required dependencies
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Initialize the app
const app = express();

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (CSS, Images, JS)
app.use(express.static(__dirname)); // This will serve files from the root folder

// MongoDB Atlas connection string
const mongoURI = 'mongodb+srv://coderrohit2927:Rohit%402927@cluster0.45pafsa.mongodb.net/?retryWrites=true&w=majority';

// Connect to MongoDB Atlas
mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Define a schema and model for user data
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Route to handle form submission
app.post('/submit', async (req, res) => {
  try {
    const { username, message } = req.body;

    // Save the user data to the database
    const newUser = new User({ username, password: message });
    await newUser.save();

    console.log('Data saved:', { username, message });
    res.status(200).send('Data saved successfully!');
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
