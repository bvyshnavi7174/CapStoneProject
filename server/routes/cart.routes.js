const express = require('express');
const router = express.Router();
const Cart = require('../models/cart.model');

// Add item to cart
router.post('/add', async (req, res) => {
  try {
    const cartItem = new Cart(req.body);
    const savedItem = await cartItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all cart items for a user
router.get('/:useremail', async (req, res) => {
  try {
    const cartItems = await Cart.find({ useremail: req.params.useremail });
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// New route to store formatted cart data
router.post('/store', async (req, res) => {
  try {
    const cartData = req.body;
    const savedItems = await Cart.insertMany(cartData); // Save multiple documents
    res.status(201).json(savedItems);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;