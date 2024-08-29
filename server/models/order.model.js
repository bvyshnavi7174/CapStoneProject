const mongoose = require('mongoose');

// Define schema for an order
const orderSchema = new mongoose.Schema({
  username: { type: String, required: true },
  useremail: { type: String, required: true },
  orderDate: { type: Date, default: Date.now }, // Date when the order is placed
  items: [
    {
      bookName: { type: String, required: true },
      bookImage: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true }
    }
  ],
  totalAmount: { type: Number, required: true }, // Total amount of the order
  status: { type: String, default: 'Pending' } // Status of the order, e.g., 'Pending', 'Shipped', 'Delivered'
});

// Create and export the model
module.exports = mongoose.model('Order', orderSchema);
