const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  username: { type: String, required: true },
  useremail: { type: String, required: true },
  bookname: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  currentdate: { type: Date, default: Date.now },
  rating: { type: Number },
  review: { type: String }
});

module.exports = mongoose.model('Cart', cartSchema);
