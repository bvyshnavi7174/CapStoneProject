const express = require('express');
const router = express.Router();
const Order = require('../models/order.model');

// Add a new order
router.post('/add', async (req, res) => {
    try {
      console.log('Received order data:', req.body); // Log the request body
  
      const { username, useremail, items, totalAmount, cardDetails } = req.body;
  
      if (!username || !useremail || !items || !totalAmount || !cardDetails) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
  
      for (const item of items) {
        if (!item.bookName || !item.bookImage || !item.quantity) {
          return res.status(400).json({ message: 'Each item must include bookName, bookImage, and quantity' });
        }
      }
      router.post('/add', async (req, res) => {
        try {
          const { username, useremail, items, totalAmount, cardDetails } = req.body;
      
          if (!username || !useremail || !items || !totalAmount || !cardDetails) {
            return res.status(400).json({ message: 'Missing required fields' });
          }
      
          for (const item of items) {
            if (!item.bookName || !item.bookImage || !item.quantity) {
              return res.status(400).json({ message: 'Each item must include bookName, bookImage, and quantity' });
            }
          }
      
          if (!cardDetails.cardNumber || !cardDetails.expiryDate || !cardDetails.cvv) {
            return res.status(400).json({ message: 'Missing card details' });
          }
      
          const order = new Order({ username, useremail, items, totalAmount, cardDetails });
          const savedOrder = await order.save();
          res.status(201).json(savedOrder);
        } catch (error) {
          console.error('Error saving order:', error);
          res.status(400).json({ message: error.message });
        }
      });
      
      if (!cardDetails.cardNumber || !cardDetails.expiryDate || !cardDetails.cvv) {
        return res.status(400).json({ message: 'Missing card details' });
      }
  
      const order = new Order({ username, useremail, items, totalAmount, cardDetails });
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
