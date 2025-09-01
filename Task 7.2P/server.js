const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // for parsing JSON

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/bikeApp')
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Routes
app.use('/', userRoutes);

// Create HTTP server and bind socket.io
const server = http.createServer(app);
const io = new Server(server);

// Handle socket connections
io.on("connection", (socket) => {
  console.log("⚡ New client connected:", socket.id);

  // Emit random number every 3 seconds
  const interval = setInterval(() => {
    const randomNumber = Math.floor(Math.random() * 100);
    socket.emit("randomNumber", randomNumber);
  }, 3000);

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
    clearInterval(interval);
  });
});

// Start server only if not in test mode
if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`🚴 Server running on http://localhost:${PORT}`);
  });
}

// Export app for testing
module.exports = app;
