const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
    username: { type: String, required: true },
    useremail: { type: String, required: true },
    orderDate: { type: Date, default: Date.now }, 
    items: [
      {
        bookName: { type: String, required: true },
        bookImage: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true }
      }
    ],
    totalAmount: { type: Number, required: true }, 
    status: { type: String, default: 'buy' }, 
    cardDetails: {
      cardNumber: { type: String, required: true },
      expiryDate: { type: String, required: true },
      cvv: { type: String, required: true }
    } 
});

module.exports = mongoose.model('Order', orderSchema);
