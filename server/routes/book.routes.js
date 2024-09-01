const express = require('express');
const router = express.Router();
const Book = require('../models/book.model');


router.get('/', async (req, res) => {
  try {
 
    const { username } = req.query;
    
    let query = {};
    if (username) {
      query.username = username;
    }

  
    const books = await Book.find(query);
    console.log('Books retrieved:', books);
    res.json(books);
  } catch (err) {
    console.error('Error retrieving books:', err.message);
    res.status(500).json({ message: err.message });
  }
});


router.post('/', async (req, res) => {
  const book = new Book(req.body);
  try {
    const savedBook = await book.save();
    res.status(201).json(savedBook);
  } catch (err) {
    console.error('Error adding book:', err.message);
    res.status(400).json({ message: err.message });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedBook);
  } catch (err) {
    console.error('Error updating book:', err.message);
    res.status(400).json({ message: err.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    console.error('Error deleting book:', err.message);
    res.status(400).json({ message: err.message });
  }
});


router.put('/update-status', async (req, res) => {
  try {
    const books = req.body;
    const updatePromises = books.map(book => 
      Book.findByIdAndUpdate(book._id, { status: book.status }, { new: true })
    );
    const updatedBooks = await Promise.all(updatePromises);
    res.json(updatedBooks);
  } catch (err) {
    console.error('Error updating book statuses:', err.message);
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
