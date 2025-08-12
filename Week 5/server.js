const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const User = require('./models/User.js');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/bikeApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("MongoDB Connected");
}).catch(err => console.log(err));

// Routes
app.post('/submit', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const newUser = new User({ firstName, lastName, email, password });
    await newUser.save();
    res.send('User registered successfully!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to submit login data.');
  }
});

// Import route file
const helloRoute = require('./routes/hello.js');
 // Mount the route at /api/hello
app.use('/api/hello', require('./routes/hello'));
 // Root route
app.get('/', (req, res) => {
 res.send('Welcome to the Home Page!');
});
// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
