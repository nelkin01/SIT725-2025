// Import the Express module so we can create a web server.
const express = require('express');
// Import Node.js's built-in 'path' module to help with file paths.
const path = require('path');
// Create an instance of an Express application.
const app = express();
// Define the port number to listen on.
// It uses an environment variable PORT if provided; otherwise, it defaults to 3000.
const PORT = process.env.PORT || 3000;
// Set up middleware to serve static files from the "public" folder.
// This means that when a request is made to the root URL ("/"),
// Express will look for a file named index.html (or other static assets) inside the "public" directory.
app.use(express.static(path.join(__dirname, 'public')));

//add endpoint
app.get('/add', (req, res) => {
  const a = parseFloat(req.query.a);
  const b = parseFloat(req.query.b);
  if (isNaN(a) || isNaN(b)) {
    return res.send("Error: Please provide valid numbers for 'a' and 'b' query parameters.");
  }
  const sum = a + b;
  res.send(`The sum of ${a} and ${b} is: ${sum}`);
});

// /subtract endpoint
app.get('/subtract', (req, res) => {
  const a = parseFloat(req.query.a);
  const b = parseFloat(req.query.b);
  if (isNaN(a) || isNaN(b)) {
    return res.send("Error: Please provide valid numbers for 'a' and 'b'.");
  }
  const result = a - b;
  res.send(`The result of ${a} minus ${b} is: ${result}`);
});

// Start the server and have it listen on the specified port.
// Once the server is running, log a message to the console indicating where it's accessible.
app.listen(PORT, () => {
console.log(`Server is running on http://localhost:${PORT}`);
});
