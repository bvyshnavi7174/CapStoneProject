const express = require('express');
const router = express.Router();
const User = require('../models/user.model');

// Sign Up
router.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ error: 'Failed to register user' });
    }
});

// Sign In
router.post('/signin', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username, password });
        if (user) {
            res.status(200).json({ message: 'User signed in successfully' });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Failed to sign in user' });
    }
});

// Get User Details
router.get('/username/:username', async (req, res) => {
    try {
        const { username } = req.params;
        const user = await User.findOne({ username });
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ error: 'Failed to fetch user details' });
    }
});

// Update User Details
router.put('/update/:username', async (req, res) => {
    try {
        const { username } = req.params;
        const updates = req.body;
        const user = await User.findOneAndUpdate({ username }, updates, { new: true });
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ error: 'Failed to update user details' });
    }
});


// Delete User
router.delete('/delete/:username', async (req, res) => {
    try {
        const { username } = req.params;
        const result = await User.deleteOne({ username });
        if (result.deletedCount > 0) {
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ error: 'Failed to delete user' });
    }
});

module.exports = router;
