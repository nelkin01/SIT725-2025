const User = require('../models/User');

exports.registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const newUser = new User({ firstName, lastName, email, password });
    await newUser.save();
    res.send('User registered successfully!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to submit login data.');
  }
};
