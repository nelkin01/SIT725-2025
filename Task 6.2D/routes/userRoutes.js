const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/userController');

router.get('/', (req, res) => {
  res.status(200).send('Bike App API is working!');
});

router.post('/submit', registerUser);

module.exports = router;
