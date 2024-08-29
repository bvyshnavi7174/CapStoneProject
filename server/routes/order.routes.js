const express = require('express');
const router = express.Router();
const Order = require('../models/order.model');

// Add a new order
router.post('/add', async (req, res) => {
  try {
    const { username, useremail, items, totalAmount } = req.body;
    if (!username || !useremail || !items || !totalAmount) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const order = new Order({ username, useremail, items, totalAmount });
    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(400).json({ message: error.message });
  }
});

// Get all orders for a user
router.get('/:useremail', async (req, res) => {
  try {
    const orders = await Order.find({ useremail: req.params.useremail });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update the status of an order
router.put('/update/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
