const express = require('express');
const router = express.Router();
const User = require('../models/user');

// POST - Add a new user
router.post('/users', async (req, res) => {
  try {
    const { name, role, email, phoneNumber } = req.body;
    // Create a new user
    const user = new User({ name, role, email, phoneNumber });
    // Save the user to the database
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
});

// GET - Get all users
router.get('/users', async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server Error' });
    }
  });
  
  const mongoose = require('mongoose');

  // GET - Get a single user by ID
  router.get('/users/:id', async (req, res) => {
    try {
      const userId = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ error: 'Invalid ObjectId' });
      }
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server Error' });
    }
  });

  // DELETE - Delete a single user by ID
router.delete('/users/:id', async (req, res) => {
    try {
      const userId = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ error: 'Invalid ObjectId' });
      }
      const user = await User.findByIdAndDelete(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // PUT - Update user details by ID
router.put('/users/:id', async (req, res) => {
    try {
      const userId = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ error: 'Invalid ObjectId' });
      }
      const { name, role, email, phoneNumber } = req.body;
      const user = await User.findByIdAndUpdate(
        userId,
        { name, role, email, phoneNumber },
        { new: true } // Return the updated user
      );
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  
module.exports = router;
