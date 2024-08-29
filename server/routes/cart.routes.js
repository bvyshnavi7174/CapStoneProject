// const express = require('express');
// const router = express.Router();
// const Cart = require('../models/cart.model');

// // Add item to cart
// router.post('/add', async (req, res) => {
//   try {
//     const { username, useremail, bookName, bookImage, price, rating, review } = req.body;
//     if (!username || !useremail || !bookName || !bookImage || !price) {
//       return res.status(400).json({ messge: 'Missing required fields' });
//     }

//     const cartItem = new Cart({ username, useremail, bookName, bookImage, price, rating, review });
//     const savedItem = await cartItem.save();
//     res.status(201).json(savedItem);
//   } catch (error) {
//     console.error('Error saving cart item:', error); // Log the error
//     res.status(400).json({ message: error.message });
//   }
// });

// // Get all cart items for a user
// router.get('/:useremail', async (req, res) => {
//   try {
//     const cartItems = await Cart.find({ useremail: req.params.useremail });
//     res.json(cartItems);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // New route to store formatted cart data
// router.post('/store', async (req, res) => {
//   try {
//     console.log('Received cart data:', req.body); // Log received data
//     const cartData = req.body;
//     const savedItems = await Cart.insertMany(cartData);
//     res.status(201).json(savedItems);
//   } catch (error) {
//     console.error('Error saving cart item:', error); // Log errors
//     res.status(400).json({ message: error.message });
//   }
// });

// module.exports = router;
