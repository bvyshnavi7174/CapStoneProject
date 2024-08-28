const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  userid: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  useremail: String,
  username: String,
  bookName: String,
  bookImage: String,
  price: Number,
  rating: Number,
  review: String,
  date: { type: Date, default: Date.now },
  status: { type: String, default: 'sell' },
  inCart: { type: Boolean, default: false }
});


module.exports = mongoose.model('Book', bookSchema);
