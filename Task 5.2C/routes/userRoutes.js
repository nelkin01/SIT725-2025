const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// POST route for registration
router.post('/submit', userController.registerUser);

module.exports = router;
